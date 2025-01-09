import React from 'react'

function PFP({imageUrl}: {imageUrl?: string}) {
   const url = imageUrl? imageUrl: "https://krono-shop.com/media/image/28/eb/08/0171-PE_1280x1280.jpg"
  return (
    <div className="h-36 w-48 rounded-full overflow-hidden">
    <img src={url} alt="" className="w-full h-full object-cover" />
  </div>
  )
}

export default PFP
