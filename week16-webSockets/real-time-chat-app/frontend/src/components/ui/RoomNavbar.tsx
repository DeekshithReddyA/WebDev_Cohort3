
import pp from '../assets/pp.png';

export const RoomNavbar = () => {
    return (
        <div className="bg-neutral-700 min-w-fit min-h-16 max-h-20 p-3">
            <div className="flex ml-2">
                    <img className={`rounded-full h-14 w-14`} src={pp} />
                <div className={`mt-2 ml-6 font-medium text-lg text-white`}>
                    Room Name
                </div>
            </div>
        </div>
    );
}