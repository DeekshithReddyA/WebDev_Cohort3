import { SmallBrain } from "../icons/BrainIcon";
import { NotesIcon } from "../icons/NotesIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
    item : "youtube" | "brain" | "tweet" | "note";
    setItem : any;
}

export const Sidebar = (props: SidebarProps) => {

    return (
        <div className={`md:w-60 md:block md:bg-gray-100 h-screen outline outline-gray-200 transition-all duration-300 w:14 fixed dark:bg-gray-1100 dark:border-r-1 dark:border-white-500`}>
            <div className="md:pl-4 px-1 pt-4 mt-6">
                <div onClick={(e) => {
                    e.preventDefault();
                    props.setItem("brain");
                }}>
                    <SidebarItem text="Second Brain" icon={<SmallBrain />} chosenItem={props.item === "brain" ? true : false}/>
                </div>
                <div onClick={(e) => {
                    e.preventDefault();
                    props.setItem("youtube");
                }}>
                    <SidebarItem text="Youtube" icon={<YoutubeIcon />} chosenItem={props.item === "youtube" ? true : false}/>
                </div>
                <div onClick={(e) => {
                    e.preventDefault();
                    props.setItem("tweet");
                }}>
                    <SidebarItem text="Tweets" icon={<TwitterIcon />} chosenItem={props.item === "tweet" ? true : false}/>
                </div>
                <div onClick={(e) => {
                    e.preventDefault();
                    props.setItem("note");
                }}>
                    <SidebarItem text="Notes" icon={<NotesIcon size="md" />} chosenItem={props.item === "note" ? true : false}/>
                </div>
            </div>
        </div>
    )
}