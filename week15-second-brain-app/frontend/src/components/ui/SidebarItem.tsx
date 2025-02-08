import { ReactElement } from "react";

export const SidebarItem = ({text , icon, chosenItem}: {
    text: string;
    icon : ReactElement;
    chosenItem : boolean;
}) => {
    return( 
    <div className="cursor-pointer group py-1">
        <div className={`${chosenItem ? "dark:bg-purple-700 bg-purple-1000/70" : "hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain"} rounded-lg  flex justify-between text-gray-700`}>
            <div className="md:p-2 md:block hidden md:font-medium dark:text-white">
                {text} 
            </div>
            <div className="p-2">
                {icon}
            </div>
        </div>
    </div>
    )
}

