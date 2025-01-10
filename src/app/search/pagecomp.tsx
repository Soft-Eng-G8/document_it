"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/multiple_uses/pagination"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const pagecomp = ({totalPages}:{totalPages:number}) => {
  console.log("Total Pages: ", totalPages)
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`)
  };
  return (
    <Pagination>
  <PaginationContent>
    {Array.from({ length: totalPages }, (_, index) => (
      <PaginationItem key={index} onClick={()=>{
        createPageURL(index + 1)
      }}>
        <PaginationLink href={`#`}>{index + 1}</PaginationLink>
      </PaginationItem>
    ))}
  </PaginationContent>
</Pagination>

  )
}

export default pagecomp