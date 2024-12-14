import React from 'react'
import RoundedTag from './rounded_tag'

interface TagsProps {
  items: string[];
}

function LittleTags({items}: TagsProps) {
  return (
    <div className="flex md:min-w-[450px]  flex-1 bg-mywhite rounded-lg shadow-xl justify-around items-center flex-row min-h-28">
      <RoundedTag imgSrc = "https://www.svgrepo.com/show/442466/category.svg" text={items[0]}/>
      <RoundedTag imgSrc = "https://icons.veryicon.com/png/o/miscellaneous/esgcc-basic-icon-library/date-71.png" text={items[1]}/>
      <RoundedTag imgSrc = "https://icons.veryicon.com/png/o/system/dan_system/file-60.png" text={items[2]}/>
    </div>
  )
}

export default LittleTags
