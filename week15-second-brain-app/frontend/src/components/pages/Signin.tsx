import { useNavigate } from "react-router-dom"
import { ArrowRight } from "../icons/Arrows"
import { LockIcon } from "../icons/LockIcon"
// import { MailIcon } from "../icons/MailIcon"
import { UserIcon } from "../icons/UserIcon"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { useState } from "react"
import { BACKEND_URL } from "../../Config"
import axios from "axios";



export const Signin = () => {
    const navigate = useNavigate();



    const [responseMessage , setResponseMessage] = useState("");
    const [formData, setFormData] = useState<{username: string , password:string}>({
        username: "",
        password : ""
    })


    const handleChange = (e: any) => {
        const {name , value} = e.target;
        
        setFormData({
            ...formData ,
            [name] : value
        })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        signin();
    };

    const signin = async () => {


        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,formData);
        if(response.status === 200){
            setFormData({
                username : "",
                password: ""
            });
            const jwt = response.data.token;
            localStorage.setItem("token" , jwt);
            navigate('/dashboard');
        } else{
            setResponseMessage(response.data.message);
        }
        
    }

    return(
        <div className="min-h-screen translation-colors bg-gradient-to-br from-purple-500 to-pink-500 flex justify-center items-center">
            <div className="p-4 bg-white flex flex-col justify-center items-center rounded-lg shadow-lg dark:bg-black">
                <div className="m-2">
                        <img className="w-48"src="https://media-hosting.imagekit.io//8b468e186a09429e/secondbrain.png?Expires=1833046694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W8yQtX9RHx2qQJcvrn6OpADulEvSG4xacm4m-Ag8UnLcfbrOs4scFz3zgCjLVE57iYGuw0-ZHBdQsXglsql~6c8EBtbha2NOWSFKg0VGvWURtdFQCKUxy-muz75yHy~2Le3Mv65ldvk98N07fFbycbEqT4lYJU6e0AiVfriygbciSVoAY8Fwnzi50kYe1JjcIB3O1VZSTIfjhHVtGXHffdnZtiSOc-IHe7o14Z5PIvK0txbOVMtk5v6m8bGs4RVObDhzSbqsaowBininsrwmJZZh2rt64FlacUAJvMK21ofBmNHkjXUeb99SqBXLAm6W4jsr9GIpE9lvrY5BlL-FzQ__" />
                </div>
                <div className="mt-6 mb-3 text-lg font-medium dark:text-white">
                    Welcome Back!
                </div>
                <div className="mt-2 text-white">
                    {responseMessage !== "" && <div className="p-1 bg-red-600/80 rounded text-xs">{responseMessage}!!</div>}
                </div>
                <form className="flex flex-col items-center"onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="pl-1 pb-1">Username</label>
                        <Input icon={<UserIcon size="sm"/>} name={"username"} value={formData.username} onChange={handleChange} placeholder="John Doe"/>
                    </div>
                    <div className="m-2">
                        <label className="pl-1 pb-1">Password</label>
                        <Input type="password" name={"password"} value={formData.password} onChange={handleChange} icon={<LockIcon size="sm"/>} placeholder="********"/>
                    </div>
                    <div className="m-4">
                        <Button 
                            variant="primary" 
                            size="sm" 
                            text="Sign In " 
                            endIcon={<ArrowRight size="sm" />}  
                            type="submit" // Set button type to submit
                        />
                    </div>
                </form>
                <div className="flex mt-2">
                    <div className="text-gray-500 text-sm pr-1">
                        Don't have an account? 
                    </div>
                    <div className="text-purple-1100 text-sm underline cursor-pointer hover:text-purple-1200" onClick={(e) => {
                        e.preventDefault();
                        navigate('/signup')
                    }}>
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    )
}