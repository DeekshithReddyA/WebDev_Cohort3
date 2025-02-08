
import { Sidebar } from '../ui/Sidebar'
import { Navbar } from '../ui/Navbar'
import { CreateContentModal } from '../ui/CreateContentModal'
import { useState } from 'react'
import { useContent } from '../hooks/useContent';
import { ShareBrainModal } from '../ui/ShareBrainModal'
import { ContentGrid } from '../ui/ContentGrid'
import { EditContentModal } from '../ui/EditContentModal';


type SidebarItem = "brain" | "youtube" | "tweet" | "note"

type CardDataType = {
    title : string,
    link : string,
    type : "youtube" | "tweet" | "note",
    note : string,
    contentId: string
}

export function Dashboard() {

  const [contentModalOpen , setContentModalOpen] = useState<boolean>(false);
  const [editContentModalOpen , setEditContentModalOpen] = useState<boolean>(false);
  const [shareModalOpen , setShareModalOpen] = useState<boolean>(false);
  const {refresh , contents} = useContent();

  const [item , setItem] = useState<SidebarItem>("brain");

    const [cardData , setCardData ] = useState<CardDataType>({
    title: "",
    link : "",
    type : "note",
    note : "",
    contentId : ""
  });



  return (
    <div>
    <div className='dark:bg-gray-1100 bg-gray-100 min-h-screen min-w-screen'>
      <div className='pt-16'>
        <Sidebar item={item} setItem={setItem}/>
      </div>
        {/* <div className='flex ml-15 md:ml-64 mt-4 gap-4 sm:columns-2 md:columns-3 lg-columns-4'>*/}
        <div className='md:ml-64 ml-14 px-2 mt-10'>
          <ContentGrid
          setEditModalOpen={setEditContentModalOpen}
          setCardData={setCardData}
          contents={contents} 
          item={item} 
          refresh={refresh} 
        />
        </div>
        <Navbar setContentModalOpen={setContentModalOpen} setShareModalOpen={setShareModalOpen}/>
    </div>
    <CreateContentModal open={contentModalOpen} setOpen={setContentModalOpen} refresh={refresh}/>
    <ShareBrainModal open={shareModalOpen} setOpen={setShareModalOpen} />
    <EditContentModal openEditContent={editContentModalOpen} setOpenEditContent={setEditContentModalOpen} refresh={refresh} cardData={cardData}/>
    </div>
  )
}


