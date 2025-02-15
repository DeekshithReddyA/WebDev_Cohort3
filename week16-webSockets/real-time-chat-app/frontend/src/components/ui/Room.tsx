import { SendHorizontal } from "lucide-react";
import { Input } from "./Input";
import { RoomNavbar } from "./RoomNavbar";
import { userDataProps } from "../types/userData";
import { useEffect, useState } from "react";
interface RoomProps {
    room?: {
        _id: string;
        roomId: string;
        name: string;
        roomPicture?: {
            data: any;
            contentType: string;
        };
    };
    messages?: {
        text: string;
        timestamp: string;
        room_id: string;
        sender: {
            username: string,
            _id: string
        };
    }[]
    userData?: userDataProps;
    socket: WebSocket
}

export const Room = (props: RoomProps) => {
    const [roomMessages , setRoomMessages] = useState<any>();
    const [formData, setFormData] = useState({
        text: ""
    });




    useEffect(() => {
        const rm = props.messages?.filter((message) => message.room_id === props.room?._id);
        console.log(rm);
        setRoomMessages(rm);
    } , [props.room, props.messages]);


        useEffect(() => {
        props.socket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            if (receivedMessage.type === "chat" && receivedMessage.room_id === props.room?._id) {
                setRoomMessages((prevMessages:any ) => {
                    if (!prevMessages.some((msg: any) => msg._id === receivedMessage._id)) {
                        return [...prevMessages, receivedMessage];
                    }
                    return prevMessages;
                });
            }
        };
        console.log(roomMessages);
    }, [props.room]);


    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.text.trim()) return;
        const newMessage = {
            _id: Date.now().toString(), // Temporary ID until DB assigns one
            text: formData.text,
            timestamp: new Date().toISOString(),
            roomId: props.room?.roomId,
            sender: {
                username: props.userData?.username || "Unknown",
                _id: props.userData?._id || "0"
            }
        };

        setRoomMessages((prev: any) => [...prev , newMessage]);

        props.socket.send(JSON.stringify({
            type: "chat",
            payload: {
                roomId: props.room?.roomId ,
                room_id: props.room?._id,
                userId: props.userData?._id,
                msg: formData.text    
            }
        }));

        setFormData({text: ""});
        
    }



    return (
        <>
            <div className="flex flex-col bg-neutral-900 h-screen">
                <div className="fixed top-0 w-full z-10">
                    <RoomNavbar room={props.room} />
                </div>

                <div className="flex-1 overflow-y-auto pt-16 pb-24 px-4 
                scrollbar-thin
                scrollbar-track-neutral-800 
                scrollbar-thumb-neutral-600">

                    <div className="flex flex-col space-y-4 mt-6">
                        <div className="flex flex-col space-y-4">
                            {roomMessages?.map((message: any, i: any) => (
                                <div key={i} className={`flex ${(message.sender.username === props.userData?.username) ? 'items-end flex-col' : 'items-start'}`}>
                                    <div className={`max-w-64 p-3 rounded-lg break-words ${(message.sender.username === props.userData?.username) ? 'bg-blue-600' : 'bg-neutral-800'
                                        } text-white`}>
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            {/* {messages?.map((message: any, i: any) => (
                                <div key={i} className={`flex ${(message.sender.username === props.userData?.username) ? 'items-end flex-col' : 'items-start'}`}>
                                    <div className={`max-w-64 p-3 rounded-lg break-words ${(message.sender.username === props.userData?.username) ? 'bg-blue-600' : 'bg-neutral-800'
                                        } text-white`}>
                                        {message.text}
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
                <form autoComplete={"off"} onSubmit={handleSubmit}>
                    <div className="fixed flex items-center bottom-0 w-full bg-black pt-4 pb-6 px-4 border-t border-neutral-800">


                        <div className="md:w-1/2 w-2/3 lg:w-2/3 xl:w-3/4 3xl:w-4/5">
                            <Input name={"text"} value={formData.text} onChange={handleChange} placeholder="Type a message" />
                        </div>

                        <button type="submit">
                        <div className="ml-4 mr-6 text-white">
                            <SendHorizontal size={24} />
                        </div>
                            </button>

                    </div>
                </form>
            </div>
        </>
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