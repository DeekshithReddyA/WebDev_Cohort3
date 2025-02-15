import { useEffect, useState } from 'react';

interface RoomCardProps {
    sidebarOpen?: boolean;
    name: string;
    roomPicture?: {
            data: any,
            contentType: any
        };
    }
        

export const RoomCard = (props: RoomCardProps) => {
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {

        if(props.roomPicture)
        {
            const base64 = btoa(
                new Uint8Array(props.roomPicture.data.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setImageUrl(`data:${props.roomPicture.contentType};base64,${base64}`);
        };
    }, [props.roomPicture]);
    return (
        <div>
            <div className="flex">
                <img className={`ml-1 rounded-full ${props.sidebarOpen ? "h-14 w-14" : "h-9 w-9"}`} src={imageUrl} />
                <div className={`mt-3 ml-6 ${props.sidebarOpen ? "block text-white font-medium text-xl" : "hidden"}`}>
                    {props.name}
                </div>
            </div>
        </div>
    );
}