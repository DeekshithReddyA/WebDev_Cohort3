import { useState, useEffect } from "react";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Notepage } from "../icons/NotePage";


interface SharedCardProps {
    size: "md" | "sm";
    title: string;
    type: "youtube" | "tweet" | "note";
    link : string;
    refresh: any;
    note: string;
}

const defaultStyles = "rounded-xl outline-gray-200 border border-gray-100 shadow-sm";

const hoverStyles = "hover:cursor-pointer hover:scale-[1.02] duration-300 hover:border-purple-1100 hover:shadow-xl"



export const SharedCard = (props: SharedCardProps) => {
      
    
    useEffect(() => {
        //@ts-ignore
        if (props.type === "tweet" && typeof window !== "undefined" && window.twttr) { window.twttr.widgets.load();
        }
    }, [props.link, props.type]);

    const sizeStyles = {
        "md": props.type === "tweet" || "youtube" ? "max-w-72 min-h-64" : "max-w-64 min-h-64",
        "sm": props.type === "tweet" || "youtube" ? "max-w-72 min-h-64" : "max-w-48 min-h-48"
    }
    const [hover , setHover] = useState(false);
    return <div className="relative">
        <div className={`${sizeStyles[props.size]} ${defaultStyles} ${hoverStyles} ${hover ? "bg-gradient-to-br from-transparent to-purple-1000/10 dark:from-gray-900 dark:to-purple-1200/40" : "bg-white dark:bg-gray-1000"}`} onMouseOver={() => {setHover(true)}} onMouseLeave={() => setHover(false)}>
            <div className="flex p-3 items-center justify-between">
                <div className="flex items-center">
                    <div className={`pr-6 dark:text-white`}>
                        {props.type === "youtube" ? <YoutubeIcon /> : (props.type === "tweet" ? <TwitterIcon /> : <Notepage />)}
                    </div>
                    <div className={`font-medium ${hover ? "text-purple-1200" : "dark:text-white"}`}>
                        {props.title}
                    </div>
                </div>

            </div>
            <div className={`flex justify-center m-2 max-w-64 ml-3.5`}>
                {props.type === "youtube"  && 
                <iframe className="rounded-md shadow-lg" src={props.link.replace("watch" , "embed").replace("?v=" , "/")} 
                        height={"150"} width={"250"} 
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>}
                {props.type === "tweet" && <blockquote className="twitter-tweet w-full max-w-full" data-theme="dark"
                        >
                    <a href={props.link.replace("x.com" , "twitter.com")}
                    ></a>
                </blockquote>}
            </div>
            <div className="flex m-4 items-center dark:text-white">{props.note}</div>
        </div>
    </div>
}