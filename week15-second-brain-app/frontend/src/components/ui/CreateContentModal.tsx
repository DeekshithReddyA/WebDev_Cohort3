import { CancelIcon } from "../icons/CancelIcon"
import { Button } from "./Button"
import { Input } from "./Input"

interface CreateContentProps{
    open : boolean ;
    onClose : () => void;
}

export const CreateContentModal = (props: CreateContentProps) =>{
    return (
        <div>
            {props.open && <div className="w-screen h-screen bg-slate-300/60 fixed top-0 left-0 flex items-center justify-center">
                <div className="flex flex-col justify-center bg-white rounded-lg">
                 <div className="flex justify-end">
                    <div className="hover:cursor-pointer" onClick={props.onClose}>
                    <CancelIcon size = "lg" />
                    </div>
                 </div>
                 <div className="m-4">
                    <Input placeholder="Title..." onChange={() => {}} />
                    <Input placeholder="Link..." onChange={() => {}} />
                    <div className="flex justify-center">
                        <Button variant="primary" size="md" text="Add Note" onClick={() => {}}/>
                    </div>
                </div>
                </div>
                </div>}
        </div>
    )
}