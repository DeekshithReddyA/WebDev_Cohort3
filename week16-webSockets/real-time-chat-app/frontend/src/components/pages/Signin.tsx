import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
"use client";
import React, { useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../Config";



export function Signin() {
    const [responseMessage , setResponseMessage ] = useState("");

    const [formData , setFormData] = useState({
      username : "",
      password: ""
    });

    const handleChange = (e: any) => {
      const {name , value} = e.target;

      setFormData({
        ...formData ,
        [name] : value
      })
    }

    const signin = async() => {
      try {
        console.log(BACKEND_URL);
        const response = await axios.post(`${BACKEND_URL}/signin` , formData);
        if(response.status === 200){
          localStorage.setItem('token' , response.data.token);
          setFormData({
            username : "",
            password : ""
          });
          setResponseMessage("");
          navigate('/home');
        }
      } catch(error){
        if(axios.isAxiosError(error) && error.response){
          console.log(error.response.data.message);
          setResponseMessage(error.response.data.message);
        }
      }
    }

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signin();
    }
  return (
    <div className="flex items-center justify-center">
    <BackgroundGradientAnimation>
    </BackgroundGradientAnimation>
    <div className="absolute max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back to ChatBuds
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to ChatBuds to continue your real-time chat experience
      </p>
      <div className="flex flex-col items-center justify-between">
        <div className="m-2 mt-4 p-1 bg-neutral-700 rounded-md">
          <div className="text-red-500">
            {responseMessage}
          </div>
        </div>
      </div>

      <form className="my-5" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input name={"username"} value={formData.username} onChange={handleChange} id="username" placeholder="john_doe" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input name={"password"} value={formData.password} onChange={handleChange} id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
      <div className="flex">
        <p className="text-neutral-600 text-smmax-w-sm dark:text-neutral-300">
        Don&apos;t have an account? 
      </p> 
      <p className="underline cursor-pointer text-blue-600 mx-2 text-md max-w-sm dark:text-blue-300"
         onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
         }}>
        Sign up
      </p>
      </div>
    </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

