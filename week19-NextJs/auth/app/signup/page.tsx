"use client"

import axios from "axios"
import { fromJSON } from "postcss";
import { useState } from "react"

export default function Signup() {
        const [formData , setFormData] = useState({
        username : "",
        password : ""
    });

    const handleChange = (e: any) => {
        const {name , value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        })
    }
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="border p-2 flex flex-col">
            <input className="m-2 text-black" type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} ></input>
            <input className="m-2 text-black" type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} ></input>
            <button onClick={() => {
                axios.post("http://localhost:3000/api/v1/signup" , {
                    username : formData.username,
                    password: formData.password
                })
            }}
            >Sign up </button>
        </div>
    </div>
}