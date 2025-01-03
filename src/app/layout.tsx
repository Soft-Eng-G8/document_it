'use client'
import React from "react"
import Navbar from "@/components/organisms/navbar"
import './globals.css'
import { SessionProvider } from "next-auth/react"

const refetchInterval = 15 * 24 * 60 * 60 


export default ({children}: {children: React.ReactNode}) => (
  <html>
    <body>
      <SessionProvider>
        <Navbar></Navbar>
        {children}
      </SessionProvider>
    </body>
  </html>
)
