import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

// interface SidebarProps {
//     sidebarOpen : boolean ;
//     setSidebarOpen: any;
// }

export const Sidebar = () => {
    return (
        <div className={`md:w-60 md:block md:bg-white h-screen outline outline-gray-200 border transition-all duration-300 w:14 absolute`}>
            <div className="md:pl-4 px-1 pt-4">
                <SidebarItem text="Youtube" icon={<YoutubeIcon />}/>
                <SidebarItem text="Tweets" icon={<TwitterIcon />} />
                <SidebarItem text="Notes" icon={<TwitterIcon />} />
            </div>
        </div>
    )
}