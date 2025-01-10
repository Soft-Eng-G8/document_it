import React from 'react'
import FileIcon from '@/components/ui/single_use/doc_display/file_icon'

interface AttachedFilesProps {
    files: string[];
}

function AttachedFiles() {
  return (
    <div className="p-4 rounded-lg  lg:ml-20 lg:mr-20 ">
    <div className=" mb-10">
      <h1 className="font-bold text-xl text-black">Download Files</h1>
    <div className="h-5"></div>
    <div className='flex items-start gap-5'>
        <FileIcon text='Document 1' />
        <FileIcon text='Document 2'/>
    </div>
      
    </div>
  </div>
  )
}

export default AttachedFiles
