
import { Sidebar } from '../ui/Sidebar'
import { Navbar } from '../ui/Navbar'
import { Card } from '../ui/Card'
import { CreateContentModal } from '../ui/CreateContentModal'
import { useState } from 'react'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../../Config'

interface ContentType {
  type: "youtube" | "tweet";
  link: string;
  title : string;
  note: string;
  _id : string;
}

export function Dashboard() {

  const [contentModalOpen , setContentModalOpen] = useState<boolean>(false);
  const {refresh , contents} = useContent();



  return (
    <div>
    <div className='dark:bg-gray-1100 bg-gray-100 min-h-screen min-w-screen'>
      <div className='pt-16'>
        <Sidebar/>
      </div>
        {/* <div className='flex ml-15 md:ml-64 mt-4 gap-4 sm:columns-2 md:columns-3 lg-columns-4'>*/}
        <div className='md:ml-64 ml-14 px-2 mt-10'>
          <div className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-1'>
            {contents.map((content: ContentType , index) => (
              <div key={index + 1} className='break-inside-avoid-column mb-4'>
                <Card size='sm' 
                      title={content.title} 
                      type={content.type} 
                      link={content.link}
                      _id={content._id}
                      refresh={refresh}
                      note={content.note}
                />
              </div>
            ))}
          </div>
        </div>
        <Navbar setModalOpen={setContentModalOpen}/>
    </div>
    <CreateContentModal open={contentModalOpen} setOpen={setContentModalOpen} refresh={refresh}/>
    </div>
  )
}


