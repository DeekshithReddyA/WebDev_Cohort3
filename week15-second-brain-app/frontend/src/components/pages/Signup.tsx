import { useNavigate } from "react-router-dom"
import { ArrowRight } from "../icons/Arrows"
import { LockIcon } from "../icons/LockIcon"
import { MailIcon } from "../icons/MailIcon"
import { UserIcon } from "../icons/UserIcon"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"


export const Signup = () => {
    const navigate = useNavigate();
    return(
        <div className="min-h-screen translation-colors bg-gradient-to-br from-purple-500 to-pink-500 flex justify-center items-center">
            <div className="p-4 bg-white flex flex-col justify-center items-center rounded-lg shadow-lg">
                <div className="m-2">
                        <img className="w-48"src="https://media-hosting.imagekit.io//8b468e186a09429e/secondbrain.png?Expires=1833046694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W8yQtX9RHx2qQJcvrn6OpADulEvSG4xacm4m-Ag8UnLcfbrOs4scFz3zgCjLVE57iYGuw0-ZHBdQsXglsql~6c8EBtbha2NOWSFKg0VGvWURtdFQCKUxy-muz75yHy~2Le3Mv65ldvk98N07fFbycbEqT4lYJU6e0AiVfriygbciSVoAY8Fwnzi50kYe1JjcIB3O1VZSTIfjhHVtGXHffdnZtiSOc-IHe7o14Z5PIvK0txbOVMtk5v6m8bGs4RVObDhzSbqsaowBininsrwmJZZh2rt64FlacUAJvMK21ofBmNHkjXUeb99SqBXLAm6W4jsr9GIpE9lvrY5BlL-FzQ__" />
                </div>
                <div className="mt-6 mb-3 text-lg font-medium">
                    Create an Account
                </div>
                <div className="m-2">
                    <label className="pl-1 pb-1">Username</label>
                    <Input icon={<UserIcon size="sm"/>} placeholder="John Doe"/>
                </div>
                <div className="m-2">
                    <label className="pl-1 pb-1">Email</label>
                    <Input icon={<MailIcon size="sm"/>} placeholder="abc@example.com"/>
                </div>
                <div className="m-2">
                    <label className="pl-1 pb-1">Password</label>
                    <Input type="password" icon={<LockIcon size="sm"/>} placeholder="********"/>
                </div>
                <div className="m-4">
                    <Button variant="primary" size="sm" text="Sign Up " endIcon={<ArrowRight size="sm" />} onClick={() => {
                        navigate('/dashboard');
                    }}/>
                </div>
                <div className="flex mt-2">
                    <div className="text-gray-500 text-sm pr-1">
                        Already have an account? 
                    </div>
                    <div className="text-purple-1100 text-sm underline cursor-pointer hover:text-purple-1200" onClick={(e) => {
                        e.preventDefault();
                        navigate('/')
                    }}>
                        Sign in
                    </div>
                </div>
            </div>
        </div>
    )
}