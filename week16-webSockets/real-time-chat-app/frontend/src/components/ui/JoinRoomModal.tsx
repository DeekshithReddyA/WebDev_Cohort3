import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "./Input";
import { BottomGradient } from "./BottomGradient";
import axios from "axios";

interface JoinRoomModalProps {
    joinRoomModalOpen: boolean;
    setJoinRoomModalOpen: any;
    refresh: any;
}

export const JoinRoomModal = (props: JoinRoomModalProps) => {
    const [responseMessage, setResponseMessage] = useState("");
    const [formData, setFormData] = useState({ roomId: "" });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const joinRoom = async () => {
        try {
            const response = await axios.post("http://localhost:4000/join-room", formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            if (response.status === 200) {
                props.refresh();
                setResponseMessage("Room Joined");
                props.setJoinRoomModalOpen(false);

            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setResponseMessage(error.response.data.message);
            }
        }
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinRoom();
    }
    return (
        <>
            {props.joinRoomModalOpen &&
                <div className="flex items-center justify-center bg-black/50 backdrop-blur-sm fixed z-50 h-screen w-screen">
                    <div className="min-w-64 bg-black outline outline-neutral-900 text-white min-h-32 rounded-md p-4">
                        <div className="flex justify-end">
                            <div onClick={(e) => {
                                e.preventDefault();
                                setFormData({
                                    roomId: ""
                                });
                                setResponseMessage("");
                                props.setJoinRoomModalOpen(false);
                            }} className="hover:scale-[1.05] cursor-pointer transition-all duration-300 object-contain">
                                <X />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center m-2">
                            <div className="text-xl font-medium">
                                Join Room
                            </div>
                            <div className="p-1 my-4 bg-neutral-800 rounded-lg text-red-500">
                                {responseMessage}
                            </div>
                            <form onSubmit={handleSubmit} >

                                <Input name={"roomId"} value={formData.roomId} onChange={handleChange} placeholder="Enter the Invite Code" />
                                <div className="flex items-center justify-center m-4 mt-6">
                                    <button
                                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                        type="submit"
                                    >
                                        Join Room &rarr;
                                        <BottomGradient />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}