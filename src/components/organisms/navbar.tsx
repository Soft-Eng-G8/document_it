import Link from "next/link";
import Image from "next/image";
import SearchBar from "../molecules/searchBar";
import { CircleUser, FileText, LogIn, LogOut, Pencil, UserPlus } from "lucide-react";


const Navbar = async () => {


  return(
  <nav className="shadow-md h-[4rem] bg-mywhite">
    <div className="py-2 px-5 w-full h-full">
      <div className="flex justify-between">
        <div className="w-full flex">
          <Link href={"/"} className="flex justify-center items-center">
            <Image src='/logo.png' width={96} height={40} alt="logo" className="mr-5"/>
          </Link>
        <SearchBar />
        </div>
        <div className="flex gap-1 items-center w-1/6 justify-evenly">
          <Link href="/categories">
            <FileText size={32}/>
          </Link>

          <Link href="/doc_create" title="Create a Document"> 
            <Pencil size={32}/>
          </Link>
          <Link href="/login" title="Login"> 
            <LogIn size={32}/>
          </Link>
          <Link href="/logout" title="Logout"> 
            <LogOut size={32}/>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);}





export default Navbar