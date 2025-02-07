import { FormEvent, useEffect, useState } from "react";
import { CancelIcon } from "../icons/CancelIcon";
import { Link } from "../icons/Link";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../Config";
import { Clipboard } from "../icons/Clipboard";
import { CopiedClipboard } from "../icons/CopiedClipboard";

interface ShareBrainProps{
    open: any;
    setOpen: any;
}

export function ShareBrainModal(props: ShareBrainProps){

    const [publicVisibility , setPublicVisibility] = useState<boolean>(false);
    const [link , setLink] = useState<string>("");
    const [copy , setCopy] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setCopy(false);
        },1500);

        return () => clearTimeout(timeout);
    },[copy])

    const setPrivate = async () => {
        console.log("enter setPrivate");
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share: false
            } , {
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            });
            if(response.status === 201){
                setLink("");
                
            }

        } catch(err){
            console.log(err);
        }
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

    const handleGenerateLink = async (e: FormEvent) =>{
        e.preventDefault();
        setPublicVisibility(true);
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share: true
            } , {
                headers:{
                    'Authorization' : localStorage.getItem('token'),
                    'X-Forwarded-Host': window.location.host,
                    'X-Forwarded-Proto': window.location.protocol.replace(':', '')

                }
            });
            if(response.status === 200){
                setLink(response.data.link);
            } else if(response.status === 201){
                setLink("");
                setPublicVisibility(false);
            }
        }catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            {props.open && <div className="w-screen h-screen bg-slate-300/60 fixed top-0 left-0 flex items-center justify-center">
                <div className="flex flex-col justify-center bg-white dark:bg-black rounded-lg">
                 <div className="flex justify-end">
                    <div className="hover:cursor-pointer dark:text-white" onClick={(e) => {
                        e.preventDefault();
                        props.setOpen(false);
                    }}>
                    <CancelIcon size = "lg" />
                    </div>
                 </div>
                <div className="flex justify-center dark:text-white text-xl font-medium">
                    Share Brain
                </div>
                <div className="dark:text-white"></div>
                <form onSubmit={handleGenerateLink}>
                 <div className="m-4">
                    <div className="flex items-center my-4 ml-4">
                        <Input name={"link"} value={link} readOnly={true} placeholder={"Generate Link..."} icon={<Link size="sm"/>}/>
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
                    <div className="flex justify-center mb-4">
                        <Button type="submit" variant="primary" size="sm" text="Generate Link"/>
                    </div>

                    <div className="m-4 mt-8">
                        <div className="font-medium dark:text-white">
                            Set Profile Visibility
                        </div>
                        <div className="flex gap-2">
                            <Button text="Private" variant={publicVisibility === false ? "primary" : "secondary"} onClick={() => {
                                setPublicVisibility(false);
                                setLink("");
                                setPrivate();
                                }} size="sm"/>
                            <Button text="Public" variant={publicVisibility === true ? "primary" : "secondary"} onClick={() => {
                                setPublicVisibility(true);
                                }} size="sm" />
                        </div>
                    </div>

                </div>
                </form>
                <div className="dark:text-white p-2">
                </div>
                </div>
                </div>}
        </div>
    )
}