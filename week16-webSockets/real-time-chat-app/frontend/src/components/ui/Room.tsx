import { SendHorizontal } from "lucide-react";
import { Input } from "./Input";
import { RoomNavbar } from "./RoomNavbar";

export const Room = () => {
    return (
        <div className="flex flex-col bg-neutral-900 h-screen">
            <div className="fixed top-0 w-full z-10">
                <RoomNavbar />
            </div>

            <div className="flex-1 overflow-y-auto pt-16 pb-24 px-4 
                scrollbar-thin
                scrollbar-track-neutral-800 
                scrollbar-thumb-neutral-600">
                
                <div className="flex flex-col space-y-4 mt-6">
                    <div className="flex flex-col space-y-4">
                        {/* Left-aligned message */}
                        <div className="flex items-start">
                            <div className="max-w-64 p-3 rounded-lg bg-neutral-800 text-white break-words">
                                Hello this is a test message from the other person
                            </div>
                        </div>

                        {/* Right-aligned message */}
                        <div className="flex items-end flex-col">
                            <div className="max-w-64 p-3 rounded-lg bg-blue-600 text-white break-words">
                                This is my message that's aligned to the right
                            </div>
                        </div>

                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`flex ${i % 2 === 0 ? 'items-start' : 'items-end flex-col'}`}>
                                <div className={`max-w-64 p-3 rounded-lg break-words ${
                                    i % 2 === 0 ? 'bg-neutral-800' : 'bg-blue-600'
                                } text-white`}>
                                    Message {i + 1} - {i % 2 === 0 ? 'Received' : 'Sent'} message content
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="fixed flex items-center bottom-0 w-full bg-black pt-4 pb-6 px-4 border-t border-neutral-800">
    <div className="md:w-1/2 w-2/3 lg:w-2/3 xl:w-3/4 3xl:w-4/5">
        <Input className="" placeholder="Type a message"/>
    </div>
    <div className="ml-4 mr-6 text-white">
        <SendHorizontal size={24}/>
    </div>
</div>

            {/* <div className="fixed flex bottom-0 w-full bg-black pt-4 pb-6 px-4 border-t border-neutral-800">
                <div className="flex-1">
                    <Input placeholder="Type a message"/>
                </div>
                <div className="flex-shrink-0 text-white mt-2 mx-4">
                    <SendHorizontal size={24}/>
                </div>
            </div> */}
        </div>
    );
};



// import { Input } from "./Input";
// import { RoomNavbar } from "./RoomNavbar";

// export const Room = () => {
//     return (
//     <>
//         <div className="fixed min-w-full">
//             <RoomNavbar />
//         </div>
//         <div className="h-screen overflow-y-auto bg-black text-white
//             scrollbar-thin
//             scrollbar-track-neutral-800 
//             scrollbar-thumb-neutral-600">
//             <div className="mt-24 m-4">
//                 <div className="">
//                 <div className="flex p-2 rounded-lg max-w-64 text-black bg-white">
//                     Hello testing
//                 </div>
//                 <div className="flex p-2 rounded-lg text-black bg-white">
//                     Hello testing1
//                 </div>
//                 <div className="p-2 rounded-lg text-black bg-white">
//                     Hello testing1
//                 </div>
//                 </div>
//             </div>
//         </div>
//         <div className="bottom min-w-full bg-red-500">
//             <Input placeholder="Type a message"/>
//         </div>
//     </>
//     );
// }