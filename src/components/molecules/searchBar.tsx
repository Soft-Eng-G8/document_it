import { Search } from "lucide-react"


const SearchBar = () => (
  <div className="p-2 bg-slate-300 w-1/5">
    <div className="inline-block">
      <Search className="inline-block mr-2"/>
      <input type="text" className="outline-none text-lg bg-transparent text-gray-500" />
    </div>
  </div>
)


export default SearchBar