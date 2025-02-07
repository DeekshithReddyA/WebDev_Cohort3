import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../Config";
import axios from "axios";


export const useSharedContent = (id: string) => {
    const [sharedContents , setSharedContents] = useState([]);
    const [username , setUsername] = useState("");

    const refreshShared = () => {
            axios.get(`${BACKEND_URL}/api/v1/brain/${id}`
        )
        .then((response) => {
            setSharedContents(response.data.content);
            setUsername(response.data.username);
        })
    }
    useEffect(() => {
        refreshShared();
        const handleContentUpdate = () => refreshShared();
        window.addEventListener('contentUpdated', handleContentUpdate);
        return () => window.removeEventListener('contentUpdated', handleContentUpdate);
    }, [id]);

    return {refreshShared ,username , sharedContents};
}