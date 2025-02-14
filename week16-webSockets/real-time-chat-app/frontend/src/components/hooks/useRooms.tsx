import axios from "axios";
import { useEffect, useState } from "react";

export const useUserData = () => {
    const [userData , setUserData ] = useState();

    const refresh = () => {
        axios.get("http://localhost:4000/home" ,{
            headers: {
                "Authorization" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data);
            setUserData(response.data.userData);
        });
    }

    useEffect(() => {
        refresh();
    }, []);

    return {refresh ,  userData};
}