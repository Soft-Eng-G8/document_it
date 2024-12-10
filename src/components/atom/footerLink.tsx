import Link from "next/link";

interface IFooterLink {
  href: string
  text: string
}

const FooterLink = (props: IFooterLink) => (
  <Link href={props.href}
    className="
    border-b-white border-b-2 text-xl
      transition-all duration-200 hover:bg-white hover:text-[#222] hover:border-transparent
      px-3 py-3 hover:rounded-xl
    ">
    {props.text}
  </Link>
)

export default FooterLink