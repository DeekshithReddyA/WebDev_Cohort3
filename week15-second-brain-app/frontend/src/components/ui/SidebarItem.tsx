import { ReactElement } from "react";

export const SidebarItem = ({text , icon}: {
    text: string;
    icon : ReactElement;
}) => {
    return( 
    <div className="cursor-pointer group py-1">
        <div className="rounded-lg transition-all duration-300 flex justify-between text-gray-700 hover:bg-gray-200 hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain dark:hover:bg-gray-800">
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