
import { Sidebar } from '../ui/Sidebar'
import { Input } from '../ui/Input'
import { SearchIcon } from '../icons/SearchIcon'
import { useSharedContent } from '../hooks/useSharedContent';
import { SharedCard } from '../ui/SharedCard';
import { useParams } from 'react-router-dom';

interface ContentType {
  type: "youtube" | "tweet";
  link: string;
  title : string;
  note: string;
  _id : string;
}

export function SharedBrain() {

    const {id}: any = useParams();


  const {refreshShared ,username , sharedContents} = useSharedContent(id);



  return (
    <div>
    <div className='dark:bg-gray-1100 bg-gray-100 min-h-screen min-w-screen'>
      <div className='pt-16'>
        <Sidebar/>
      </div>
        {/* <div className='flex ml-15 md:ml-64 mt-4 gap-4 sm:columns-2 md:columns-3 lg-columns-4'>*/}
        <div className='md:ml-64 ml-14 px-2 mt-10'>
          <div className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-1'>
            {sharedContents.map((content: ContentType , index) => (
              <div key={index + 1} className='break-inside-avoid-column mb-4'>
                <SharedCard size='sm' 
                      title={content.title} 
                      type={content.type} 
                      link={content.link}
                      refresh={refreshShared}
                      note={content.note}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Navbar */}
        <div className="min-h-16 min-w-screen bg-slate-200 dark:bg-gray-900 flex items-center justify-between fixed top-0 right-0 left-0">
            <div className="ml-2 flex items-center">
                <img className="w-32" src="https://media-hosting.imagekit.io//8b468e186a09429e/secondbrain.png?Expires=1833046694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W8yQtX9RHx2qQJcvrn6OpADulEvSG4xacm4m-Ag8UnLcfbrOs4scFz3zgCjLVE57iYGuw0-ZHBdQsXglsql~6c8EBtbha2NOWSFKg0VGvWURtdFQCKUxy-muz75yHy~2Le3Mv65ldvk98N07fFbycbEqT4lYJU6e0AiVfriygbciSVoAY8Fwnzi50kYe1JjcIB3O1VZSTIfjhHVtGXHffdnZtiSOc-IHe7o14Z5PIvK0txbOVMtk5v6m8bGs4RVObDhzSbqsaowBininsrwmJZZh2rt64FlacUAJvMK21ofBmNHkjXUeb99SqBXLAm6W4jsr9GIpE9lvrY5BlL-FzQ__" />
            </div>
            <div className='dark:text-white text-lg font-medium'>
                {username}'s Second Brain
            </div>
            <div className="md:flex hidden mr-4">
                <Input icon={<SearchIcon size="sm"/>} placeholder="Search" onChange={() => { }} />
            </div>
        </div>
    </div>
    </div>
  )
}
