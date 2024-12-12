import InfoEnterSide from '@/components/ui/single_use/doc_create/info_enter_side'
import React from 'react'

function DocsCreate() {
  return (
    <div className='bg-mygrey'>
      <div className="flex h-screen bg-mygrey">
      <div className="flex flex-col h-[800px] w-full lg:w-3/12 bg-mygrey p-10 lg:p-4 lg:ml-20">
      <InfoEnterSide />
      </div>

      <div className="hidden lg:flex flex-col flex-1 h-[800px] bg-mygrey p-4 lg:mr-20">
        <div className="flex items-center h-16 bg-mygrey rounded-md mb-4 ">
          <h1 className='font-bold text-2xl text-black'>Preview</h1>
        </div>
        <div className="flex-1 bg-mywhite rounded-lg shadow-lg"></div>
      </div>

      
    </div>
    </div>
    
    
  )
}

export default DocsCreate
