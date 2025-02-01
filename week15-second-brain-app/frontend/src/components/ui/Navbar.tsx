import { BrainIcon } from "../icons/BrainIcon"
import { PlusIcon } from "../icons/PlusIcon"
import { SearchIcon } from "../icons/SearchIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./Button"
import { Input } from "./Input"

export const Navbar = () => {
    return (
        <div className="min-h-16 min-w-screen bg-slate-200 flex items-center justify-between">
            <div className="flex items-center">
                <div className="text-purple-1200 md:px-2 px-1">
                    <BrainIcon />
                </div>
                <div className="md:text-2xl md:font-medium text-lg font-medium">Second Brain</div>
            </div>
            <div className="md:flex hidden">
                <Input icon={<SearchIcon size="sm"/>} placeholder="Search" onChange={() => { }} />
            </div>
            <div className="flex items-center">
                <div className="md:mx-2 mx-1">
                    <Button startIcon={<ShareIcon size='sm' />} variant='secondary' size='sm' text='Share Brain' onClick={() => { }} />
                </div>
                <div className="md:mr-4 mr-2">
                    <Button startIcon={<PlusIcon size='sm' />} variant='primary' size='sm' text='Add Content' onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}