import pp from '../assets/pp.png';
export const RoomCard = ()  => {
    return(
        <div>
            <div className="flex">
                <div className="">
                    <img className="rounded-full h-14 w-14" src={pp} />
                </div>
                <div className='mx-2 ml-6'>
                    Room Name
                </div>
            </div>
        </div>
    );
}