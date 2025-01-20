import { Search } from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/multiple_uses/command"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/multiple_uses/button"
import { Document , Category} from "@prisma/client"
import { useDebouncedCallback } from 'use-debounce';
import Link from "next/link"

type ExtendedDocument = Document & {
  category: Category
}

const SearchInput = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<ExtendedDocument[]>([])
  const debouncedSearch = useDebouncedCallback(async (searchTerm) => {
    setLoading(true)
    try {
      if (!searchTerm) {
        setItems([])
        return
      }
      const res = await fetch(`/api/search/document?query=${searchTerm}`)
      const data = await res.json()
      console.log(data)
      setItems(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, 500)
  // Debouncing effect for searching
  useEffect(() => {
    debouncedSearch(search)
  }, [search,debouncedSearch])

  // Keyboard shortcut effect
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button className="my-2 bg-black hover:bg-black/80" onClick={() => setOpen(o => !o)}>
        Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
        />
        {loading &&
        <CommandLoading>
          Content is loading, hold on please
        </CommandLoading>
        }
        <CommandList>
          {
            (items == null || items.length === 0 || loading) ? 
            (<CommandEmpty>No results found.</CommandEmpty>):
          <CommandGroup title={`Results for '${search}'`}>
            {items?.map((item) => (
              <CommandItem key={item.id}>
                <Link href={`/doc_display/${item.id}`}className="flex flex-col p-2 border-b border-gray-200">
                  <span className="font-bold text-lg">{item.title}</span>
                  <span className="text-gray-600 line-clamp-2">{item.description}</span>
                  <span className="text-sm text-gray-500">
                    {item.category.title}
                  </span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchInput