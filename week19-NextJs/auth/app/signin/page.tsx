"use client"

import axios from "axios"
import { useState } from "react"

export default function Signin() {
    const [formData , setFormData] = useState({
        username : "",
        password : ""
    })

    return <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="border p-2">
            <input  type="text" placeholder="username" onChange={(e) => {
                const {name , value} = e.target;

                setFormData({
                    ...formData,
                    [name] : value
                })
            }} ></input>
            <input type="password" placeholder="password" onChange={(e) => {
                const {name , value} = e.target;

                setFormData({
                    ...formData,
                    [name] : value
                })
            }} ></input>
            <button onClick={() => {
                axios.post("http://localhost:3000/api/v1/signin", {
                    username : formData.username,
                    password: formData.password
                });
                setFormData({ username : "" , password: ""});
            }}
            >Sign in </button>
        </div>
    </div>
}