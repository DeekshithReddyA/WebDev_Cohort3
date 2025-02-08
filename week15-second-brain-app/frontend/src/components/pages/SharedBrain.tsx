
import { Sidebar } from '../ui/Sidebar'
import { Input } from '../ui/Input'
import { SearchIcon } from '../icons/SearchIcon'
import { useSharedContent } from '../hooks/useSharedContent'
import { SharedCard } from '../ui/SharedCard'
import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'

interface ContentType {
  type: "youtube" | "tweet" | "note";
  link: string;
  title: string;
  note: string;
  _id: string;
}

type SidebarItem = "brain" | "youtube" | "tweet" | "note"

const ContentGrid = ({ contents, item, refresh }: {
  contents: ContentType[],
  item: SidebarItem,
  refresh: () => void
}) => {
  const filteredContents = useMemo(() => {
    if (!contents?.length) return [];
    return item === "brain" 
      ? contents 
      : contents.filter(content => content.type.toLowerCase() === item.toLowerCase());
  }, [contents, item]);

  if (!filteredContents.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No content found for {item} category.
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-1">
      {filteredContents.map((content) => (
        <div 
          key={content._id} 
          className="break-inside-avoid-column mb-4"
        >
          <SharedCard
            size="sm"
            title={content.title}
            type={content.type}
            link={content.link}
            refresh={refresh}
            note={content.note}
          />
        </div>
      ))}
    </div>
  );
};

export function SharedBrain() {
  const { id }:any= useParams<{ id: string }>();
  const [item, setItem] = useState<SidebarItem>("brain");
  const { refreshShared, username, sharedContents } = useSharedContent(id);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle loading state
  if (!sharedContents) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-1100 bg-gray-100 min-h-screen min-w-screen">
      {/* Navbar */}
      <div className="min-h-16 min-w-screen bg-slate-200 dark:bg-gray-900 flex items-center justify-between fixed top-0 right-0 left-0 z-10">
        <div className="ml-2 flex items-center">
          <img 
            className="w-32" 
            src="https://media-hosting.imagekit.io//8b468e186a09429e/secondbrain.png?Expires=1833046694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W8yQtX9RHx2qQJcvrn6OpADulEvSG4xacm4m-Ag8UnLcfbrOs4scFz3zgCjLVE57iYGuw0-ZHBdQsXglsql~6c8EBtbha2NOWSFKg0VGvWURtdFQCKUxy-muz75yHy~2Le3Mv65ldvk98N07fFbycbEqT4lYJU6e0AiVfriygbciSVoAY8Fwnzi50kYe1JjcIB3O1VZSTIfjhHVtGXHffdnZtiSOc-IHe7o14Z5PIvK0txbOVMtk5v6m8bGs4RVObDhzSbqsaowBininsrwmJZZh2rt64FlacUAJvMK21ofBmNHkjXUeb99SqBXLAm6W4jsr9GIpE9lvrY5BlL-FzQ__" 
            alt="Second Brain Logo"
          />
        </div>
        <div className="dark:text-white text-lg font-medium">
          {username}'s Second Brain
        </div>
        <div className="md:flex hidden mr-4">
          <Input 
            icon={<SearchIcon size="sm"/>} 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e:any) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="pt-16">
        <Sidebar item={item} setItem={setItem}/>
      </div>

      {/* Content */}
      <div className="md:ml-64 ml-14 px-2 mt-10">
        <ContentGrid 
          contents={sharedContents} 
          item={item} 
          refresh={refreshShared}
        />
      </div>
    </div>
  );
}