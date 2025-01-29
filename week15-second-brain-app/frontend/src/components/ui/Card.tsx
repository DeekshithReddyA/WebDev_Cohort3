import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";

interface CardProps {
    size: "md" | "sm";
    title: string;
    type: "youtube" | "tweet"
    link : string
}

const defaultStyles = "rounded-md outline-gray-200 border shadow-sm";

const hoverStyles = "hover:cursor-pointer hover:scale-[1.02] duration-300 hover:border-purple-1100 hover:shadow-lg"


const sizeStyles = {
    "md": "max-w-80 min-h-80",
    "sm": "max-w-80 min-h-80"
}

export const Card = (props: CardProps) => {
    const [hover , setHover] = useState(false);
    return <div>
        <div className={`${sizeStyles[props.size]} ${defaultStyles} ${hoverStyles} ${hover ? "bg-gradient-to-bl from-violet-500/10 to-fuchsia-500/10" : "bg-white"}`} onMouseOver={() => {setHover(true)}} onMouseLeave={() => setHover(false)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`pr-2 `}>
                        <ShareIcon size="md" />
                    </div>
                    <div className={`text-2xl ${hover ? "text-purple-1200" : ""}`}>
                        {props.title}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`pr-2 hover:text-gray-800 ${hoverStyles} text-gray-500`}>
                        <TrashIcon size="md" />
                    </div>
                </div>
            </div>
            <div className={`pt-4 flex justify-center m-2`}>
                {props.type === "youtube"  && <iframe src={props.link.replace("watch" , "embed").replace("?v=" , "/")} height={props.size === "md" ? "250" : "200"} width={props.size === "md" ? "350" : "250"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                {props.type === "tweet" && <blockquote className="twitter-tweet max-w-48">
                    <a href={props.link.replace("x.com" , "twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
    </div>
}