import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
"use client";
import React, { useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FileUpload } from "../ui/file-upload";
import userPP from '../assets/userPP.png'
import { LabelInputContainer } from "../ui/LabelInputContainer";
import { BottomGradient } from "../ui/BottomGradient";
import { BACKEND_URL } from "../../Config";



export function Signup() {
    const navigate = useNavigate();

    const [responseMessage , setResponseMessage ] = useState("");
      const [files, setFiles] = useState<File | null>();
  const handleFileUpload = (file: File | null) => {
    setFiles(file);
  };

    const handleChange = (e: any) => {
      const {name , value} = e.target;

      setFormData({
        ...formData ,
        [name] : value
      })
    }

    const [formData , setFormData] = useState({
      username: "",
      email : "",
      password: "",
    });

    const signup = async () =>{
      try{
        
        const submitData = new FormData();
        submitData.append("username" , formData.username);
        submitData.append("email" , formData.email);
        submitData.append("password" , formData.password);
        if(files instanceof File){
          submitData.append("profilePicture" , files)
        } else{
          const response = await fetch(userPP);
          const blob = await response.blob();
          console.log(blob);
          submitData.append("profilePicture" , blob);
        }
        console.log(submitData);
         const response = await axios.post(`${BACKEND_URL}/signup` , submitData,{
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
         } );
         if(response.status === 200){
           localStorage.setItem('token' , response.data.token);
           console.log(files);
           setFormData({
           username : "",
           email: "",
           password : "",
         });
         setResponseMessage("");
           navigate('/home');
         } 
        } catch(error){
          if(axios.isAxiosError(error) && error.response){
          setResponseMessage(error.response.data.message);
        }
      }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signup();
    }
  return (
    <div className="flex items-center justify-center">
    <BackgroundGradientAnimation>
    </BackgroundGradientAnimation>
    <div className="absolute max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to ChatBuds
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to ChatBuds and have a real-time chat experience
      </p>
      <div className="flex flex-col items-center justify-between">  
      <div className="m-2 mt-4 bg-neutral-700 rounded-md p-1">
        <div className="text-red-500">
          {responseMessage}
        </div>
      </div>
      </div>

      <form className="my-2" onSubmit={handleSubmit}>

        
        <LabelInputContainer className="mb-4">
            <div className="w-full max-w-4xl mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload setResponseMessage={setResponseMessage} onChange={handleFileUpload} />
            </div>
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input name={"username"} value={formData.username} onChange={handleChange} id="username" placeholder="john_doe" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input name={"email"} value={formData.email} onChange={handleChange} id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input name={"password"} value={formData.password} onChange={handleChange} id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
      <div className="flex">
        <p className="text-neutral-600 text-smmax-w-sm dark:text-neutral-300">
        If you already have an account 
      </p> 
      <p className="underline cursor-pointer text-blue-600 mx-2 text-md max-w-sm dark:text-blue-300"
         onClick={(e) => {
            e.preventDefault();
            navigate('/');
         }}>
        Sign in
      </p>
      </div>
    </div>
    </div>
  );
};

