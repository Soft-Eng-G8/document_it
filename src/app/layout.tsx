import React from "react"
import Navbar from "@/components/organisms/navbar"
import './globals.css'

export default ({children}: {children: React.ReactNode}) => (
  <html>
    <body>
      {children}
    </body>
  </html>
)
