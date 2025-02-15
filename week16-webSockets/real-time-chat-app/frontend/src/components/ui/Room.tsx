import { SendHorizontal } from "lucide-react";
import { Input } from "./Input";
import { RoomNavbar } from "./RoomNavbar";
import { userDataProps } from "../types/userData";
import { useEffect, useRef, useState } from "react";
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
        _id: string;
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
    const [roomMessages , setRoomMessages] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        text: ""
    });
    const tempId = useRef(0);

    // Update the message filtering useEffect
useEffect(() => {
    if (!props.room || !props.messages) return;

    const currentRoomId = props.room._id.toString();
    const filtered = props.messages.filter(message => 
        message.room_id.toString() === currentRoomId
    );

    // Remove duplicates from backend response
    const uniqueMessages = filtered.reduce((acc: any[], curr: any) => {
        if (!acc.some(msg => msg._id === curr._id)) {
            acc.push(curr);
        }
        return acc;
    }, []);

    setRoomMessages(uniqueMessages);
}, [props.room, props.messages]);

    // useEffect(() => {
    //     if (!props.room || !props.messages) return;

    //     const currentRoomId = props.room._id.toString();
    //     const filtered = props.messages.filter(message => message.room_id.toString() === currentRoomId);

    //     // Ensure messages are unique
    //     // const uniqueMessages = Array.from(new Map(filtered.map(msg => [msg._id, msg])).values());

    //     setRoomMessages(filtered);
    //     console.log(filtered);
    // }, [props.room, props.messages]);

    useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === "chat" && data.room_id === props.room?._id) {
            setRoomMessages(prevMessages => {
                // Handle final messages with tempId
                if (data.tempId) {
                    const filtered = prevMessages.filter(msg => msg._id !== data.tempId);
                    const exists = filtered.some(msg => msg._id === data._id);
                    return exists ? filtered : [...filtered, data];
                }
                // Handle new messages
                const exists = prevMessages.some(msg => msg._id === data._id);
                return exists ? prevMessages : [...prevMessages, data];
            });
        }
    };
    props.socket.addEventListener('message', messageHandler);
    return () => props.socket.removeEventListener('message', messageHandler);
}, [props.room?._id]);



// useEffect(() => {
//     const messageHandler = (event: MessageEvent) => {
//         const data = JSON.parse(event.data);
//         if (data.type === "chat" && data.room_id === props.room?._id) {
//             setRoomMessages(prevMessages => {
//             const uniqueMessages = new Map(prevMessages.map(msg => [msg._id, msg])); 
//             uniqueMessages.set(data._id, data); // Ensure uniqueness

//             return Array.from(uniqueMessages.values());
// });

//         }
//     };
//     props.socket.addEventListener('message', messageHandler);
//     return () => props.socket.removeEventListener('message', messageHandler);
// }, [props.room?._id]);

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

                // Generate temporary ID
        const tempMessage = {
            _id: tempId.current++,
            text: formData.text,
            timestamp: new Date().toISOString(),
            room_id: props.room?._id,
            sender: { _id: props.userData?._id, username: props.userData?.username },
            isTemp: true
        };

        // Optimistic update
        setRoomMessages(prev => [...prev , tempMessage]);
        
        props.socket.send(JSON.stringify({
            type: "chat",
            payload: {
                room_id: props.room?._id,
                userId: props.userData?._id,
                msg: formData.text ,
                tempId : tempMessage._id   
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
                            {/* {roomMessages?.map((message: any, i: any) => (
                                <div key={i} className={`flex ${(message.sender.username === props.userData?.username) ? 'items-end flex-col' : 'items-start'}`}>
                                    <div className={`max-w-64 p-3 rounded-lg break-words ${(message.sender.username === props.userData?.username) ? 'bg-blue-600' : 'bg-neutral-800'
                                        } text-white`}>
                                        {message.text}
                                    </div>
                                </div>
                            ))} */}
                            {roomMessages
                        .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                        .map((message, index) => (
                            <div key={message._id || `temp-${index}`} className={`flex ${
                                message.sender._id === props.userData?._id ? 
                                'items-end flex-col' : 'items-start'
                            }`}>
                                <div className={`max-w-64 p-3 rounded-lg break-words ${
                                    message.sender._id === props.userData?._id ?
                                    'bg-blue-600' : 'bg-neutral-800'
                                } text-white ${message.isTemp ? 'opacity-75' : ''}`}>
                                    {message.text}
                                    <div className="text-xs mt-1 opacity-70">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
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