'use client'
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../molecules/searchBar";
import { CircleUser, FileText, LogIn, LogOut, Pencil, UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
  const {
    data: session, status
  } = useSession()
  console.log(session)
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

          {//? Below is how roles might be used. Dynamic loading and stuff may be possible, but we'll see. For now they're added via code. We might make functions to make them check permissions for roles instead, but again, we'll see 
          }
          {status === 'authenticated' && session.user.roles.find(role => role.name === 'STAFF') && (
            <Link href="/doc_create" title="Create a Document"> 
              <Pencil size={32}/>
            </Link>
          )}
          {status === 'authenticated' && (
          <Link href="/" title="Logout" onClick={() => signOut()}> 
            <LogOut size={32}/>
          </Link>
          )}
          {status === 'unauthenticated' && (
          <Link href="/login" title="Login"> 
            <LogIn size={32}/>
          </Link>
          )}
          
        </div>
      </div>
    </div>
  </nav>
);}





export default Navbar