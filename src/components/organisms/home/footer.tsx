import FooterLink from "@/components/atom/footerLink"
import Link from "next/link"


const HomeFooter = () => (
  <footer className=" bg-[#222] text-gray-300 text-center pt-10">
    <h1 className="text-6xl mb-5">Document.it</h1>
    <p className="text-lg w-1/3 m-auto leading-loose mb-5">Document.it simplifies the process of managing legal document requirements. We help you efficiently organize, track, and update all the necessary paperwork, ensuring compliance and clarity every step of the way.
  </p>
  <div className="flex justify-evenly w-1/4 m-auto mb-5">
    <FooterLink href="/bomba" text="bazingn"/>
    <FooterLink href="/bomba" text="bazingn"/>
    <FooterLink href="/bomba" text="bazingn"/>
    <FooterLink href="/bomba" text="bazingn"/>
  </div>
  <div className="bg-[#111] h-20 flex items-center justify-center">
    <h4 className="text-xl">Design by&nbsp;
      <span className="text-blue-400">Lazib Redhouane</span>
       &nbsp;and&nbsp;
       <span className="text-blue-400">Arabat Abd-Elhakim</span>
       </h4>
  </div>
  </footer>
)


export default HomeFooter