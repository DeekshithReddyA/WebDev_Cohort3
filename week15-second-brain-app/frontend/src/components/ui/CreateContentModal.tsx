import { useState } from "react";
import { CancelIcon } from "../icons/CancelIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { TextArea } from "./TextArea";
import { Link } from "../icons/Link";
import { Tag } from "../icons/Tag";
import { BACKEND_URL } from "../../Config";
import axios from "axios";

interface CreateContentProps{
    open : boolean ;
    setOpen : any;
    refresh: any;
}

type Content = "tweet" | "youtube" | "note";

interface formDataType {
    title : string;
    link : string;
    note : string;
}

export const CreateContentModal = (props: CreateContentProps) =>{

    const [responseMessage , setResponseMessage] = useState("");


    const [type , setType] = useState<Content>("note");

    const [formData , setFormData] = useState<formDataType>({
        title : "",
        link : "",
        note: "",
    });

    const addContent = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {title : formData.title ,
            link : formData.link , note : formData.note  , type : type
        } ,
            {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            }
        );

        if (response.status === 200){
            props.setOpen(false);
            props.refresh();
            setFormData({
                title: "",
                link : "",
                note : ""
            })
        } else{
            setResponseMessage(response.data.message);
        }
    }
    
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        addContent();
    }


    const handleChange = (e: any) => {
        const {name , value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        })
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
                <div className="flex justify-center dark:text-white">
                    Add Content
                </div>
                <form onSubmit={handleSubmit}>
                 <div className="m-4">
                        <div className="m-4 text-gray-900">
                            <label className="dark:text-white pl-2">Title</label>
                            <Input icon={<Tag size="sm"/>} name={"title"} value={formData.title} placeholder="Title" onChange={handleChange} />
                        </div>
                        { type !== "note" && 
                        <div className="m-4">
                                <label className="dark:text-white pl-2">Link</label>
                                <Input icon={<Link size="sm"/>} name={"link"} value={formData.link} placeholder="Link" onChange={handleChange} />
                        </div>}
                        <div className="m-4">
                            <label className="dark:text-white pl-2">Note</label>
                            <TextArea name={"note"} value={formData.note} onChange={handleChange} placeholder={"Write your thoughts here..."}/>
                        </div>
                        <div className="m-4 flex items-center justify-around">
                            <Button text="Note" variant={type === "note" ? "primary" : "secondary"} onClick={() => {
                                setType("note")
                                }} size="sm"/>
                            <Button text="Youtube" variant={type === "youtube"? "primary" : "secondary"} onClick={() => {
                                setType("youtube")
                                }} size="sm" />
                            <Button text="Tweet" variant={type === "tweet" ? "primary" : "secondary"} onClick={() => {
                                setType("tweet")
                                }} size="sm" />
                        </div>
                    <div className="flex justify-center mb-4">
                        <Button type="submit" variant="primary" size="md" text="Add Note"/>
                    </div>
                </div>
                </form>
                <div className="dark:text-white p-2">
                    {responseMessage}
                </div>
                </div>
                </div>}
        </div>
    )
}