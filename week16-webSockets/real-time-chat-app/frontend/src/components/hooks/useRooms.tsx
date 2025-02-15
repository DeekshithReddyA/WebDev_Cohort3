import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserData = () => {
    const navigation = useNavigate();
    const [userData , setUserData ] = useState();
    const [messageData, setMessageData] = useState();

    const refresh = () => {
        axios.get("http://localhost:4000/home" ,{
            headers: {
                "Authorization" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data);
            setUserData(response.data.userData);
            setMessageData(response.data.messages);
        })
        .catch(() => navigation('/'));
    }

    useEffect(() => {
        refresh();
    }, []);

    return {refresh ,  userData , messages : messageData};
}