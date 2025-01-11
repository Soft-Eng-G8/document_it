import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

const PAGESIZE = 10;
export async function fetchSearchedDocuments(query: string, currentPage: number) {
    const offset = (currentPage - 1) * PAGESIZE;
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
        END
      LIMIT ${PAGESIZE}
      OFFSET ${offset};
    `);
    return documents;
}

// get the total number of pages for the search results result per page = 10
export async function fetchDocumentsPages(query: string) {
  const result = await prisma.$queryRaw<{ count: number }[]>(Prisma.sql`
    SELECT COUNT(DISTINCT d.id) AS count
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
      OR (UPPER(c.description) LIKE UPPER('%' || ${query} || '%'));
  `);
  const count = result[0]?.count ?? 0;
  return Math.ceil(Number(count) / PAGESIZE);
}