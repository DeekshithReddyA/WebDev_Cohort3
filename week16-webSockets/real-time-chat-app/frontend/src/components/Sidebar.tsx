import { MessageSquarePlus, Search, X } from "lucide-react"
import { Input } from "./ui/Input"
import { RoomCard } from "./ui/RoomCard"

export const Sidebar = () => {
    return (<div className="min-h-screen max-w-md dark:bg-neutral-800">
        <div className="flex justify-between">
            <div className="text-white font-medium text-xl my-6 mx-6">
                ChatBuds
            </div>
            <div className="my-6 mx-10 text-white">
                <MessageSquarePlus size={24}/>         
            </div>
        </div>
        {/*Search*/}
        <div className="relative rounded-lg outline outline-neutral-700 mx-4">
            <div className="absolute left-3 top-2 dark:text-white">
                <Search />
            </div>
                <Input className="w-full pl-11" placeholder="Search Rooms..."/>
                <div className="text-neutral-400 absolute top-3 right-3">
                    <X size={18}/>
                </div>
        </div>

        {/*Rooms*/}
        <div className="text-white my-4 mx-1 space-y-4">
            <div className="hover:bg-neutral-900 p-2">
                <RoomCard />
            </div>
            <div className="hover:bg-neutral-900 p-2">
                <RoomCard />
            </div>
            <div className="hover:bg-neutral-900 p-2">
                <RoomCard />
            </div>
            <div className="hover:bg-neutral-900 p-2">
                <RoomCard />
            </div>
            <div className="hover:bg-neutral-900 p-2">
                <RoomCard />
            </div>
        </div>
    </div>
    )
} 