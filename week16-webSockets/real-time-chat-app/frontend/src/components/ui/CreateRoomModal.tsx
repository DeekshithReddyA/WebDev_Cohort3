import { ReactHTMLElement, useEffect, useState } from "react"
import FileUpload from "./file-upload"
import { LabelInputContainer } from "./LabelInputContainer";
import { Label } from "@radix-ui/react-label";
import { Input } from "./Input";
import { BottomGradient } from "./BottomGradient";
import roomPP from '../assets/roomPP.png';
import axios from "axios";
import { create } from "motion/react-client";
import { CopiedClipboard } from "../icons/CopiedClipboard";
import { Clipboard } from "../icons/Clipboard";

interface CreateRoomModalProps {
    createRoomModalOpen: boolean
}
export const CreateRoomModal = (props: CreateRoomModalProps) => {
    const [link , setLink] = useState("");
    const [copy , setCopy] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [roomCreated , setRoomCreated] = useState<boolean>(true);
    const [files, setFiles] = useState<File | null>();
    
    const [formData, setFormData] = useState({
        roomName: ""
    });


    useEffect(() => {
        const timeout = setTimeout(()=>{
            setCopy(false);
        },1500);

        return () => clearTimeout(timeout);
    },[copy])

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handleFileUpload = (file: File | null) => {
        setFiles(file);
    };

    const createRoom = async() => {
        const submitData = new FormData();
        submitData.append("roomName" , formData.roomName);
        if(files){
            submitData.append("profilePicture" , files);
        } else{
            submitData.append("profilePicture" , roomPP);
        }
        try {
            const response = await axios.post("http://localhost:4000/create-room" , submitData ,{
                headers: {
                    'Authorization' : localStorage.getItem('token'),
                    'Content-Type' : 'multipart/form-data'
                }
            });
            if(response.status === 200){
                setResponseMessage(response.data.message);
                setRoomCreated(true);
                setLink(response.data.link);
            }
        } catch(error){
            if(axios.isAxiosError(error) && error.response){
                setResponseMessage(error.response.data.message);
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRoom();
    }
        const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(link);
        } catch (err) {
            console.error(
                err
            );
            alert("Copy to clipboard failed.");
        }
    };

    return (<>
        {props.createRoomModalOpen &&
            <div className="flex items-center justify-center bg-black/50 backdrop-blur-sm fixed z-50 h-screen w-screen">
                <div className="min-w-64 bg-black outline outline-neutral-900 text-white min-h-32 rounded-md p-4">
                    <div className="flex items-center justify-center m-2 mb-4">
                        <div className="text-xl font-medium">
                            Create Room
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="roomName">Room Name</Label>
                            <Input name={"roomName"} value={formData.roomName} onChange={handleChange} id="username" placeholder="Enter room name" type="text" />
                        </LabelInputContainer>
                        <div className="w-full max-w-4xl p-2 mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                            <FileUpload setResponseMessage={setResponseMessage} onChange={handleFileUpload} />
                        </div>
                        <div className="flex items-center justify-center m-4 mt-6">
                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Create Room &rarr;
                                <BottomGradient />
                            </button>
                        </div>
                    </form> <div>
                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full"/>
                            <div className="flex items-center">
                                <div className="font-medium m-3">
                                    Invite Link
                                </div>
                                <div className="flex items-center">
                                    <Input name={"link"} readOnly value={link}/>
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
                    </div>
                </div>
            </div>}
    </>
    )
}