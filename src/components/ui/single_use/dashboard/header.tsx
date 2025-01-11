import Link from 'next/link'
import { Settings, PlusSquare, LayoutGrid, LogIn } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/multiple_uses/avatar"

// Mock authentication state - replace with your actual auth logic
const isLoggedIn = false
const user = {
  name: "John Doe",
  image: "/placeholder.svg?height=32&width=32"
}

export default function Header() {
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

          <Link 
            href="/settings" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>

          {/* Conditional rendering based on auth state */}
          {isLoggedIn ? (
            <Avatar>
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
        </nav>
      </div>
    </header>
  )
}

