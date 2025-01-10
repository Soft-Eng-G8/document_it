import SearchBar from "@/components/molecules/SearchBar"
import DocumentList from "./DocumentList"
import { fetchDocumentsPages } from "./loaders";
import Pagecomp from "./pagecomp";


const SearchPage = async (props: {
  searchParams?:
  Promise<{ query?: string; page?: string; }>;
}
) => {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = searchParams?.page || '1'
  const totalPages = query ? await fetchDocumentsPages(query) : 1;

  return (
    <div className="search-page">
      <SearchBar />
      <DocumentList query={query} currentPage={parseInt(currentPage)} />
      {query &&
        <Pagecomp  totalPages={totalPages}/>}
    </div>
  )
}

export default SearchPage