import { NotesIcon } from "../icons/NotesIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";


export const Sidebar = () => {
    return (
        <div className={`md:w-60 md:block md:bg-white h-screen light:outline light:outline-gray-200 transition-all duration-300 w:14 fixed dark:bg-black dark:border-r-2 dark:border-white-500`}>
            <div className="md:pl-4 px-1 pt-4 mt-6">
                <SidebarItem text="Youtube" icon={<YoutubeIcon />}/>
                <SidebarItem text="Tweets" icon={<TwitterIcon />} />
                <SidebarItem text="Notes" icon={<NotesIcon size="md" />} />
            </div>
        </div>
    )
}