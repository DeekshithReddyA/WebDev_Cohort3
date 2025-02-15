
import { useEffect, useState } from 'react';

interface RoomNavbarProps{
    room?: {
        name: string;
        roomPicture?: {
            data: any,
            contentType: any
        };
    }

}

export const RoomNavbar = (props: RoomNavbarProps) => {
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if(props.room?.roomPicture)
        {
            const base64 = btoa(
                new Uint8Array(props.room.roomPicture.data.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setImageUrl(`data:${props.room.roomPicture.contentType};base64,${base64}`);
        };
    }, [props.room]);
    return (
        <div className="bg-neutral-700 min-w-fit min-h-16 max-h-20 p-3">
            <div className="flex ml-2">
                    <img className={`rounded-full h-14 w-14`} src={imageUrl} />
                <div className={`mt-2 ml-6 font-medium text-lg text-white`}>
                    {props.room?.name}
                </div>
            </div>
        </div>
    );
}