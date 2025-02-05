import { useState } from "react";
import { CancelIcon } from "../icons/CancelIcon"
import { Button } from "./Button"
import { Input } from "./Input"

interface CreateContentProps{
    open : boolean ;
    setOpen : any;
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface formDataType {
    title : string;
    link : string;
    note : string;
    type : ContentType.Twitter | ContentType.Youtube
}

export const CreateContentModal = (props: CreateContentProps) =>{

    const [type , setType] = useState(ContentType.Youtube);

    const [formData , setFormData] = useState<formDataType>({
        title : "",
        link : "",
        note: "",
        type: ContentType.Youtube
    })

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

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
                <div className="flex justify-center text-white">
                    Add Content
                </div>
                 <div className="m-4">
                    <form onSubmit={handleSubmit}>
                        <div className="m-4">
                            <Input name={"title"} value={formData.title} placeholder="Title" onChange={handleChange} />
                        </div>
                        <div className="m-4">
                            <Input name={"link"} value={formData.link} placeholder="Link" onChange={handleChange} />
                        </div>
                        <div className="m-4">
                            <Input name={"note"} value={formData.note} placeholder="Note" onChange={handleChange} />
                        </div>
                        <div className="m-4 flex items-center justify-around">
                            <Button text="Youtube" variant={type=== ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Youtube)
                                }} size="sm" />
                            <Button text="Twitter" variant={type=== ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Twitter)
                                }} size="sm" />
                        </div>
                    <div className="flex justify-center">
                        <Button variant="primary" size="md" text="Add Note" onClick={() => {}}/>
                    </div>
                </form>
                </div>
                </div>
                </div>}
        </div>
    )
}