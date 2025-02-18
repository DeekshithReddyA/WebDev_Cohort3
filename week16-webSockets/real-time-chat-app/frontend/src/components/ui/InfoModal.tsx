import { useEffect, useState } from "react";
import { X } from "../icons/Cross";
import axios from "axios";
import { BACKEND_URL } from "../../Config";
import { Loading } from "./Loading";
import { Input } from "./Input";
import { CopiedClipboard } from "../icons/CopiedClipboard";
import { Clipboard } from "../icons/Clipboard";


interface InfoModalProps{
    infoModalOpen: boolean;
    setInfoModalOpen: any;
    room_id: string | undefined;
}

interface RoomDetails{
    roomDetails:{
        roomId: string,
        name: string,
        roomPicture?: {
            data: any,
            contentType: any
        };
        users: {
            username : string,
            profilePicture: {
                data : any,
                contentType: any,
            }
        }[]
    }
}

export const InfoModal = (props: InfoModalProps) => {
    const [roomDetails , setRoomDetails] = useState<RoomDetails>({
        roomDetails : {
            roomId: "",
            name : "",
            roomPicture: {
                data : "",
                contentType : "",
            },
            users  : []
        }
    });
    const [copy  ,setCopy] = useState<boolean>(false);
    const [loading , setLoading] = useState<boolean>(true);
    const [imageUrl, setImageUrl] = useState<string>();

    const dataToImageUrl = (data:any, contentType: any) => {
        const base64 = btoa(
            new Uint8Array(data)
            .reduce((data, byte) => data + String.fromCharCode(byte) , '')
        );
        return `data:${contentType};base64,${base64}`;
    }

    useEffect(() => {
        if(roomDetails.roomDetails)
        {
            const url: string = dataToImageUrl(roomDetails.roomDetails.roomPicture?.data.data , roomDetails.roomDetails.roomPicture?.contentType);
            setImageUrl(url);
        };
    }, [roomDetails]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/info/${props.room_id}` , {
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data);
            if(response.data){
                setRoomDetails(response.data);
                setLoading(false);
            } else{
                setLoading(false);
            }          
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopy(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [copy])

    const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(roomDetails.roomDetails.roomId);
        } catch (err) {
            console.error(
                err
            );
            alert("Copy to clipboard failed.");
        }
    };
    return (
        <>
        {
        props.infoModalOpen &&
        <div className="flex items-center justify-center bg-black/50 backdrop-blur-sm fixed z-50 h-screen w-screen">
            <div className="min-w-64 bg-black outline outline-neutral-900 text-white min-h-32 rounded-md p-4">
                <div className="flex justify-end">
                    <div onClick={(e) => {
                        e.preventDefault();
                        props.setInfoModalOpen(false);
                        }} className="hover:scale-[1.05] cursor-pointer transition-all duration-300 object-contain">
                        <X />
                    </div>
                </div>
                <div>
                    {loading ? <Loading /> : 
                    <div className="flex flex-col justify-center items-center">
                        <div className="font-medium text-xl mb-4">Group info </div>
                        <div>
                            <img className="rounded-full h-32 w-32" src={imageUrl}/>
                        </div>
                        <div className="my-4 text-lg">{roomDetails.roomDetails.name}</div>
                                <div className="text-sm m-3">
                                    Invite Link
                                </div>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <Input name={"link"} readOnly value={roomDetails.roomDetails.roomId} />
                                    <div className="dark:text-white ml-2 cursor-pointer hover:scale-[1.01] transition-all duration-300 object-contain"
                                        onClick={() => {
                                            handleCopyClick();
                                            setCopy(true);
                                        }}>
                                        {copy ? <div className="scale-[1.10] transition-all duration-300 object-contain">
                                            <CopiedClipboard />
                                        </div>
                                            : <Clipboard />}
                                    </div>
                                </div>
                            </div>
                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
                        <div className="mb-4 font-medium">Members</div> 
                            <div className="flex flex-col items-start">
                                {roomDetails?.roomDetails?.users.map((user, index) => {
                                    const url = dataToImageUrl(user?.profilePicture?.data.data, user?.profilePicture?.contentType);
                                    return (
                                            <div key={index} className="flex items-center">
                                                <img className="m-1 rounded-full h-8 w-8" src={url} alt="User Profile" />
                                                <div className="m-1">{user.username}</div>
                                            </div>
                                            );
                                })}
                            </div>
                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
                    </div>}
                </div>
            </div>
        </div>
        }
        </>
    );
}