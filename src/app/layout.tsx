'use client'
import React from "react"
import Navbar from "@/components/organisms/navbar"
import './globals.css'
import { SessionProvider } from "next-auth/react"
import Header from "@/components/ui/single_use/dashboard/header"

const refetchInterval = 15 * 24 * 60 * 60 


export default ({children}: {children: React.ReactNode}) => (
  <html suppressHydrationWarning>
    <body>
      <SessionProvider>
        {children}
      </SessionProvider>
    </body>
  </html>
)
