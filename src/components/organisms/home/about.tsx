import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface aboutInterface {
  headline: string
  description: string 
  image: string | StaticImport
  inverted: boolean
}

const SectionAbout = (props: aboutInterface) => (
  <section id="about">
    <div className={`py-5 px-80 h-[50vh] ${props.inverted ? `bg-gray-800` : `bg-slate-200`} grid grid-cols-2 justify-center items-center`}>
      <div className={`image_cont m-auto ${props.inverted ? `order-2` : ``}`}>
        <Image width={300} height={300} src={props.image} alt="About-1" 
        className="rounded-full transition-all duration-300 hover:scale-125"/>
      </div>
      <div className={props.inverted ? `order-1` : ``}>
        <div className={`text-3xl my-5 ${props.inverted ? `text-gray-100` : ``}`}>{props.headline}</div>
        <div className={`text-xl ${props.inverted ? `text-gray-100` : ``}`}>{props.description}</div>
      </div>
    </div>
  </section>
)

export default SectionAbout