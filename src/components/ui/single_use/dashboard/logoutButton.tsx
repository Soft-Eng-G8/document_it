'use client'

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function LogOutButton() {
  return (
          <Link 
            href="/"
            onClick={() => signOut()}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"

          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
  )
}