import pp from '../assets/pp.png';

interface RoomCardProps{
    sidebarOpen ?: boolean
}

export const RoomCard = (props:RoomCardProps)  => {
    return(
        <div>
            <div className="flex">
                    <img className={`rounded-full ${props.sidebarOpen ? "h-14 w-14" : "h-9 w-9"}`} src={pp} />
                <div className={`mt-3 ml-6 ${props.sidebarOpen ? "block text-white font-medium text-xl" : "hidden"}`}>
                    Room Name
                </div>
            </div>
        </div>
    );
}