import { PlusIcon } from "../icons/PlusIcon"
import { SearchIcon } from "../icons/SearchIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./Button"
import { Input } from "./Input"

export const Navbar = () => {
    return (
        <div className="min-h-16 min-w-screen bg-slate-200 dark:bg-gray-900 flex items-center justify-between fixed top-0 right-0 left-0">
            <div className="ml-2 flex items-center">
                <img className="w-32" src="https://media-hosting.imagekit.io//8b468e186a09429e/secondbrain.png?Expires=1833046694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W8yQtX9RHx2qQJcvrn6OpADulEvSG4xacm4m-Ag8UnLcfbrOs4scFz3zgCjLVE57iYGuw0-ZHBdQsXglsql~6c8EBtbha2NOWSFKg0VGvWURtdFQCKUxy-muz75yHy~2Le3Mv65ldvk98N07fFbycbEqT4lYJU6e0AiVfriygbciSVoAY8Fwnzi50kYe1JjcIB3O1VZSTIfjhHVtGXHffdnZtiSOc-IHe7o14Z5PIvK0txbOVMtk5v6m8bGs4RVObDhzSbqsaowBininsrwmJZZh2rt64FlacUAJvMK21ofBmNHkjXUeb99SqBXLAm6W4jsr9GIpE9lvrY5BlL-FzQ__" />
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