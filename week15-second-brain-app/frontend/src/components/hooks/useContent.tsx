import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../Config";
import axios from "axios";
import { contentUpdatedEvent } from "../events/event";

export const useContent = () => {
    const [contents , setContents] = useState([]);

    const refresh = () => {
            axios.get(`${BACKEND_URL}/api/v1/contents`,{
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            setContents(response.data.contents);
            window.dispatchEvent(contentUpdatedEvent);
        })
    }

    useEffect(() => {
        refresh();
    }, []);

    return {refresh , contents};
}