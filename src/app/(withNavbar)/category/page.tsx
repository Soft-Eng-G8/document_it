
import Header from '@/components/ui/single_use/dashboard/header'
import { Monitor, FileText, FileCode, Search, Landmark, TicketsPlane } from 'lucide-react'
import Link from "next/link"

// Define the category data structure
interface Category {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

// Categories data
const categories: Category[] = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Squarespace Tutorials",
    description: "My tutorials have found a new home at tutorials.squarespace.com",
    buttonText: "VISIT THE NEW SITE",
    buttonLink: "/tutorials"
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Squarespace Intro Course",
    description: "Squarespace Made Simple has been moved to my new membership platform.",
    buttonText: "INTRO TO SQUARESPACE",
    buttonLink: "/intro"
  },
  {
    icon: <FileCode className="w-8 h-8" />,
    title: "Squarespace CSS Cheat Sheet",
    description: "My code collection is available at tutorials.squarespace.com/css",
    buttonText: "CODE COLLECTION",
    buttonLink: "/css"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Something Else",
    description: "Let me know what you are looking for and I'll do my best to send you resources to help.",
    buttonText: "CONTACT ME",
    buttonLink: "/contact"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Something Else",
    description: "Let me know what you are looking for and I'll do my best to send you resources to help.",
    buttonText: "CONTACT ME",
    buttonLink: "/contact"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Something Else",
    description: "Let me know what you are looking for and I'll do my best to send you resources to help.",
    buttonText: "CONTACT ME",
    buttonLink: "/contact"
  }
]

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-row ml-20 space-y-6 mt-8 justify-between w-auto">
       <div className='flex flex-col gap-6 w-full'>
       {categories.map((category, index) => (
          <div 
            key={index} 
            className="bg-mywhite p-6 flex items-start gap-6 hover:shadow-lg transition-shadow rounded-lg hover:cursor-pointer"
          >
            <div className="text-black">
              {category.icon}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{category.title}</h2>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>
              
            </div>
          </div>
        ))}
       </div>
        <div className='flex flex-col w-full items-center '>
          <div className='bg-white p-4 rounded-full  text-foreground'>
          <TicketsPlane size={80} />
          </div>
          <div className='h-10'></div>
          <h1 className='text-black text-2xl font-bold'>Visa</h1>

        </div>
      </main>
    </div>
  )
}

