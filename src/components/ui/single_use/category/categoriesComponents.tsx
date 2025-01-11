"use client"
import Header from '@/components/ui/single_use/dashboard/header'
import prisma from '@/lib/db'
import { Monitor, FileText, FileCode, Search, Landmark, TicketsPlane } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from 'react'

interface Category {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  buttonLink: string
}


export default  function CategoryComponents({ documents, category}:  {documents: any, category: any }) {

    
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-row ml-20 space-y-6 mt-8 justify-between w-auto">
       <div className='flex flex-col gap-6 w-full'>
      {documents.map((doc: { id: string; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, index: Key | null | undefined) => (
          <button onClick={() => router.push(`/doc_display/${doc.id}`)} key={doc.id}>
            <div 
            key={index} 
            className="bg-mywhite p-6 flex items-start gap-6 hover:shadow-lg transition-shadow rounded-lg hover:cursor-pointer"
          >
            <div className="text-black">
              <img src={category?.imageUrl ?? "https://i.ibb.co/VLjJjLg/ljomhorya.png"} alt="" className='h-20' />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{doc.title}</h2>
                <p className="text-gray-600 mt-1">{doc.description}</p>
              </div>
              
            </div>
          </div>
         </button>
        ))}
       </div>
        <div className='flex flex-col w-full items-center '>
          <div className='bg-white p-4 rounded-full  text-foreground'>
          <img src={category?.imageUrl ?? "https://i.ibb.co/VLjJjLg/ljomhorya.png"} alt="" className='h-60'/>
          </div>
          <div className='h-10'></div>
          <h1 className='text-black text-2xl font-bold'>{category?.title}</h1>

        </div>
      </main>
    </div>
  )
}

