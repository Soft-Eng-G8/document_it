import React from 'react'
import Link from "next/link";
import { fetchSearchedDocuments } from './loaders';

const DocumentList = async ({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) => {
    let documents = [];
    if (query.length > 0) {
      console.log("Query: ", query);
      documents = await fetchSearchedDocuments(query, currentPage);
    }
    console.log("Documents: ", documents);
  return (
    <div className="document-list-container">
        <div className="document-list-title">
          <h3 className="text-lg font-bold mt-4">Search Results</h3>
        </div>
        <ul className="document-ul">
        {
          documents.length > 0 ? (
            documents.map((item:any, index:any) => (
            <li key={index} className="document-list-item">
              <Link href={"#"} className="flex flex-1 items-center gap-4">
              <div className="space-y-1">
                <p className="line-clamp-1 text-lg">{item.title}</p>
                <p className="text-sm font-light text-gray-500 line-clamp-4">{item.description}</p>
              </div>
              </Link>
            </li>
          ))) : (
            <div className="document-list-empty">
              {query.length > 0?
                <p className="text-lg font-bold">No results found</p>
                : <p className="text-lg font-bold">Search for documents</p>
                }
            </div>
          )
        }
        </ul>
      </div>
  )
}



export default DocumentList;

/* function fetchDocuments(query: string, currentPage: number) {
} */
