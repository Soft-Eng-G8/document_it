import { NextResponse, type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'query' is missing" },
      { status: 400 }
    );
  }
  try {
    console.log("query -> ", query);

    const documents = await prisma.$queryRaw<any>(Prisma.sql`
      SELECT d.*
      FROM "Document" AS d
      LEFT JOIN "Requirement" AS r ON r."documentId" = d.id
      LEFT JOIN "Category" AS c ON c.id = d."categoryId"
      WHERE
        (UPPER(d.title) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(d.content) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(d.description) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(d.additional) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(r.title) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(r.description) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(c.title) LIKE UPPER('%' || ${query} || '%'))
        OR (UPPER(c.description) LIKE UPPER('%' || ${query} || '%'))
      GROUP BY d.id
      ORDER BY
        CASE
          WHEN UPPER(d.title) LIKE UPPER('%' || ${query} || '%') THEN 1
          WHEN UPPER(d.content) LIKE UPPER('%' || ${query} || '%') THEN 2
          WHEN UPPER(d.description) LIKE UPPER('%' || ${query} || '%') THEN 3
          WHEN UPPER(d.additional) LIKE UPPER('%' || ${query} || '%') THEN 4
          WHEN UPPER(r.title) LIKE UPPER('%' || ${query} || '%') THEN 5
          WHEN UPPER(r.description) LIKE UPPER('%' || ${query} || '%') THEN 6
          WHEN UPPER(c.title) LIKE UPPER('%' || ${query} || '%') THEN 7
          WHEN UPPER(c.description) LIKE UPPER('%' || ${query} || '%') THEN 8
          ELSE 9
        END;
    `);

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error(error);
    // Safely convert the error to a string in case it's null or not an object
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}