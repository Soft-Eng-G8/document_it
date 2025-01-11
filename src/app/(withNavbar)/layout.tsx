import Header from "@/components/ui/single_use/dashboard/header";


export default ({children}: {children: React.ReactNode}) => (
  <html suppressHydrationWarning>
    <body>
      {children}
    </body>
  </html>
)
