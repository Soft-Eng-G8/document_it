import Link from 'next/link'
import { Settings, PlusSquare, LayoutGrid, LogIn, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/multiple_uses/avatar"
import { getServerSession } from 'next-auth'
import { getSession, signOut } from 'next-auth/react'
import LogOutButton from './logoutButton'
import { getServerSideProps } from 'next/dist/build/templates/pages'
import { options } from '@/app/api/auth/[...nextauth]/options'

// Mock authentication state - replace with your actual auth logic
// const isLoggedIn = false
// const user = {
//   name: "John Doe",
//   image: "/placeholder.svg?height=32&width=32"
// }

export default async function Header() {
  const session = await getServerSession(options)
  console.log(session)
  return (
    <header className="w-full border-b bg-white shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/blueDocit.png" 
            alt="Placeholder" 
            className="w-auto h-14 object-cover mx-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/categories" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <LayoutGrid className="h-4 w-4" />
            Categories
          </Link>
          
          <Link 
            href="/doc_create" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <PlusSquare className="h-4 w-4" />
            Create Document
          </Link>
          
          <Link 
            href="/settings" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>

          {/* Conditional rendering based on auth state */}
          {session ? (
            <Avatar>
              <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
              <AvatarFallback>{session.user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
          { session && (  
            <LogOutButton />
          ) }
        </nav>
      </div>
    </header>
  )
}

