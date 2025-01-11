import { NextResponse, type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

function computeRelevance(doc: any, query: string) {
    const q = query.toLowerCase();
    const safe = (s: string) => (s ?? "").toLowerCase(); // checks for presence null in the result of the query
    function occurrences(text: string, term: string) {
        /* 
        g modifier: global. All matches (don't return on first match)
        i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
         */
        return (text.match(new RegExp(term, "gi")) || []).length;
    }
    const titleMatches = occurrences(safe(doc.title), q) * 40;
    const contentMatches = occurrences(safe(doc.content), q) * 30;
    const descMatches = occurrences(safe(doc.description), q) * 20;
    const additionalMatches = occurrences(safe(doc.additional), q) * 10;
    let requirementsMatches = 0;
    if (doc.requirements) {
        for (const r of doc.requirements) {
            requirementsMatches += 3 * occurrences(safe(r.title) + " " + safe(r.description), q);
        }
    }
    let categoryMatches = 0;
    if (doc.category) {
        categoryMatches =
            5 * occurrences(safe(doc.category.title) + " " + safe(doc.category.description), q);
    }

    return (
        titleMatches +
        contentMatches +
        descMatches +
        additionalMatches +
        requirementsMatches +
        categoryMatches
    );
}

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get("query");
        if (!query) {
            return NextResponse.json(
                { error: "Query parameter 'query' is missing" },
                { status: 400 }
            );
        }
        let documents;
        try {
            documents = await prisma.document.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { content: { contains: query } },
                        { description: { contains: query } },
                        { additional: { contains: query } },
                        { category: { title: { contains: query } } },
                        { category: { description: { contains: query } } },
                        { requirements: { some: { title: { contains: query } } } },
                        { requirements: { some: { description: { contains: query } } } },
                    ]
                },
                include: {
                    requirements: true,
                    category: true
                }
            });
        } catch (dbError) {
            return NextResponse.json(
                { error: "Database error", details: String(dbError) },
                { status: 500 }
            );
        }
        documents.sort(
            (a, b) => computeRelevance(b, query) - computeRelevance(a, query)
        );
        documents = documents.slice(0, 7);
        return NextResponse.json(documents, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Unexpected error", details: String(error) },
            { status: 500 }
        );
    }
}