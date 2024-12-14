import Link from "next/link";
import SearchBar from "../molecules/searchBar";
import { CircleUser, FileText, LogIn, LogOut, Pencil, UserPlus } from "lucide-react";

const Navbar = () => (
  <nav className="shadow-md h-[4rem]">
    <div className="py-2 px-5 w-full h-full">
      <div className="flex justify-between">
        <SearchBar />
        <div className="flex gap-1 items-center w-1/6 justify-evenly">
          <Link href="/categories">
            <FileText size={32}/>
          </Link>
          <Link href="/login">
            <CircleUser size={32}/>
          </Link>
          <Link href="/doc_create" title="Create a Document"> 
            <Pencil size={32}/>
          </Link>
          <Link href='/login' title="Log In">
            <LogIn size={32} />
          </Link>
          <Link href='/signup' title="Sign Up">
            <UserPlus size={32}/>
          </Link>
          <Link href='/logout' title="Log Out">
            <LogOut size={32}/>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);





export default Navbar