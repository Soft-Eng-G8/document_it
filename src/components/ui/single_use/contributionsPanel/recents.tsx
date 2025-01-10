"use client";
import { MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/multiple_uses/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/multiple_uses/dropdown-menu"
import { useRouter } from 'next/navigation'



const conts = [
  {
    id: 1,
    name: "Emma Ryan Jr.",
    date: "Mar 9, 2023",
    docName: "Visa Application",
    status: "Done",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Justin Weber",
    date: "Mar 2, 2023",
    docName: "Visa Application",
    status: "Pending",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function RecentContributions() {
  const router = useRouter()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Recents</h1>
      <div className="flex justify-between">
        {conts.map((cont) => (
          <div
            key={cont.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white min-w-[500px] shadow-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={cont.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-black">{cont.name}</h3>
                <p className="text-sm text-gray-500">{cont.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">

              <span className="text-black font-medium">{cont.docName}
              </span>
             
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  cont.status === "Done"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {cont.status}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4 text-black" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/profile_page')} className='hover:cursor-pointer'>
                    Review
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile_page')} className='hover:cursor-pointer'>
                    View Contribution
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

