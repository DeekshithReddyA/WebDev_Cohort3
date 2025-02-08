import { useMemo } from "react";
import { Card } from "./Card";

interface ContentType {
  type: "youtube" | "tweet" | "note";
  link: string;
  title: string;
  note: string;
  _id: string;
}

type SidebarItem = "brain" | "youtube" | "tweet" | "note"





export const ContentGrid = ({setEditModalOpen , setCardData , contents, item, refresh }: { 
  contents: ContentType[], 
  item: SidebarItem, 
  setCardData: any,
  setEditModalOpen : any
  refresh: () => void 
}) => {
  const filteredContents = useMemo(() => {

    if (!contents) return [];
    return item === "brain" ? contents : contents.filter(content => content.type === item);

  }, [contents, item]);

  if (!filteredContents.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No content found for this category.
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
          <Card
            setEditOpen={setEditModalOpen}
            setCardData={setCardData}
            size="sm"
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
  );
};