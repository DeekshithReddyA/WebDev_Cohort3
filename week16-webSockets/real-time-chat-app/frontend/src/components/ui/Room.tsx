import { SendHorizontal } from "lucide-react";
import { Input } from "./Input";
import { RoomNavbar } from "./RoomNavbar";
import { userDataProps } from "../types/userData";
import { useEffect, useRef, useState } from "react";
import { InfoModal } from "./InfoModal";
import MessageBubble from "./MessageBubble";
interface Message {
    _id: string;
    text: string;
    timestamp: string;
    room_id: string;
    sender: {
        profilePicture:{
            data: any,
            contentType: any
        }
        username?: string,
        _id: string
    };
}
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
    messages?: Message[]
    userData?: userDataProps;
    socket: WebSocket;
    infoModalOpen: boolean;
    setInfoModalOpen: any;
}

export const Room = (props: RoomProps) => {
    const [roomMessages, setRoomMessages] = useState<Message[]>([]);
    const [formData, setFormData] = useState({
        text: ""
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // WebSocket handler with cleanup
    useEffect(() => {
        const filtered_messages = props.messages?.filter((message) => {
            return message.room_id === props.room?._id
        }
        );
        if (filtered_messages !== undefined) {
            setRoomMessages(filtered_messages);
        }
    }, [props.room?._id, props.messages]);

    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.type === "chat" && data.room_id === props.room?._id) {
                setRoomMessages(prev => [...prev, data]);
            }
        };

        props.socket.addEventListener('message', messageHandler);
        return () => props.socket.removeEventListener('message', messageHandler);
    }, [props.room?._id]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [roomMessages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.text.trim()) return;


        props.socket.send(JSON.stringify({
            type: "chat",
            payload: {
                room_id: props.room?._id,
                userId: props.userData?._id,
                profilePicture : props.userData?.profilePicture,
                msg: formData.text,
            }
        }));

        setFormData({ text: "" });
    };


    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    
const dataToImageUrl = (profilePicture: { data: any, contentType: any }) => { 
            const base64 = btoa(
            new Uint8Array(profilePicture.data.data)
            .reduce((data, byte) => data + String.fromCharCode(byte) , '')
        );
    return `data:${profilePicture.contentType};base64,${base64}`;
}

    return (
        <>
            <InfoModal room_id={props.room?._id} infoModalOpen={props.infoModalOpen} setInfoModalOpen={props.setInfoModalOpen} />
            <div className="flex flex-col bg-neutral-900 h-screen">
                <div className="fixed top-0 w-screen z-10">
                    <RoomNavbar setInfoModalOpen={props.setInfoModalOpen} room={props.room} />
                </div>

                <div className="flex-1 overflow-y-auto pt-16 pb-24 px-4 
                scrollbar-thin
                scrollbar-track-neutral-800 
                scrollbar-thumb-neutral-600">

                    <div className="flex flex-col space-y-4 mt-6">
                        <div className="flex flex-col space-y-4">
                            {roomMessages
                                .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                                .map((message, index) => {
                                    const url: string = dataToImageUrl(message.sender.profilePicture);
                                    console.log("Control came till here");
                                    return(
                                    <div key={`temp-${index}`} className={`flex ${message.sender?._id === props.userData?._id ?
                                            'items-end flex-col' : 'items-start'
                                        }`}>
                                        <div className="flex items-center">
                                            {
                                                message.sender?._id !== props.userData?._id && 
                                                <img className="md:h-10 md:w-10 md:mr-2 mr-1 h-6 w-6 rounded-full" src={url} alt="User Profile"/>
                                            }
                                            {/* <div className={`max-w-64 p-3 rounded-lg break-words text-sm md:text-base ${message.sender._id === props.userData?._id ?
                                                    'bg-blue-600' : 'bg-neutral-800'
                                                } text-white`}>
                                                    <div className="text-red-500 underline">{message.sender._id !== props.userData?._id && message.sender.username}</div>
                                                {message.text}
                                                <div className="text-[10px] mt-1 opacity-70">
                                                    {new Date(message.timestamp).toLocaleTimeString([] , {hour : 'numeric' , minute:'2-digit'})}
                                                </div>
                                            </div> */}
                                            <MessageBubble message={message} userData={props.userData} />
                                           {
                                                message.sender?._id === props.userData?._id && 
                                                <img className="h-10 w-10 ml-1 rounded-full" src={url} alt="User Profile"/>
                                            }
                                        </div>
                                    </div>
                                    )
                                })}
                            <div ref={messagesEndRef} />
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

