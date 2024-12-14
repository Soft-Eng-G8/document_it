
"use client"

import SectionAbout from "@/components/organisms/home/about";
import HomeFooter from "@/components/organisms/home/footer";
import { rngArr, sleep } from "@/scripts/util";
import { useRef, useEffect } from "react"

let landingTextArr = [
  "every paper finds its legal path.",
  "requirements meet clarity.",
  "compliance becomes effortless.",
  "documentation meets precision.",
  "legal meets logical.",
  "your documents find their purpose."
]

export default () => {
  const landingText = useRef<HTMLSpanElement>(null);

  const changeTextHeading = async(text: string) => {
    if(landingText.current) {
      while(landingText.current.textContent && landingText.current.textContent.length - 6) {
        landingText.current.textContent = landingText.current.textContent.slice(0, -1)        
        await sleep(30)
      }
      await sleep(200)
      for(let i = 0; i < text.length; i++){
        landingText.current.textContent = `${landingText.current.textContent}${text[i]}`
        await sleep(50)
      }
    }
  }
  
  useEffect(() => {
    changeTextHeading(rngArr(landingTextArr))
    const interval = setInterval(() => {
      if(document.hasFocus()) changeTextHeading(rngArr(landingTextArr))
    }, 10000)
    return () => clearInterval(interval)
  }, [])


  
  return (
    <>
    <header className="h-[calc(100vh-4rem)] bg-yellow-500 w-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-[8rem] text-red-500 font-thin">DOCUMENT.IT</div>
        <div id="punchline" className="text-4xl text-white">
          <span ref={landingText}>Where </span>
        </div>
      </div>
    </header>
    <SectionAbout inverted={false}
      headline={"Find all documents you need"}
      description={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem exercitationem maxime deserunt tempore? Unde ab aspernatur ut itaque odio animi placeat pariatur, veritatis iusto saepe rerum blanditiis consectetur ipsum aperiam!"}
      image={"https://picsum.photos/300"}
    />
      <SectionAbout inverted={true}
      headline={"Contribute your country's Documents!"}
      description={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem exercitationem maxime deserunt tempore? Unde ab aspernatur ut itaque odio animi placeat pariatur, veritatis iusto saepe rerum blanditiis consectetur ipsum aperiam!"}
      image={"https://picsum.photos/300"}
    />
    <HomeFooter />

    </>
  )
}
