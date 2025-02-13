import pp from '../assets/pp.png';

interface RoomCardProps{
    sidebarOpen : boolean
}

export const RoomCard = (props:RoomCardProps)  => {
    return(
        <div>
            <div className="flex">
                    <img className={`rounded-full ${props.sidebarOpen ? "h-14 w-14" : "h-9 w-9"}`} src={pp} />
                <div className={`mx-2 ml-6 ${props.sidebarOpen ? "block" : "hidden"}`}>
                    Room Name
                </div>
            </div>
        </div>
    );
}