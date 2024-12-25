import Link from "next/link"

interface IButton {
  children: string
  invert?: boolean
  rounded?: boolean
  href?: string
  action?: CallableFunction
}

const Btn = (props: IButton) => (
  <button
    className={`
      bg-[#2292E2] text-white
      px-4 py-6 
      ${props.rounded ? 'rounded-full' : ''}
    `}
  >
    {props.children}
  </button>
)

const Button = (props: IButton) => (
  props.href ? 
  <Link href={props.href}>
    <Btn {...props} />  
  </Link>
  : 
  <Btn {...props} />

)


export default Button