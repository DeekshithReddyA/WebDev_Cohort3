import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";

interface CardProps {
    size: "md" | "sm";
    title: string;
    type: "youtube" | "tweet"
    link : string
}

const defaultStyles = "rounded-xl outline-gray-200 border border-gray-100 shadow-sm";

const hoverStyles = "hover:cursor-pointer hover:scale-[1.02] duration-300 hover:border-purple-1100 hover:shadow-xl"



export const Card = (props: CardProps) => {
    const sizeStyles = {
        "md": props.type === "tweet" || "youtube" ? "max-w-72 min-h-64" : "max-w-64 min-h-64",
        "sm": props.type === "tweet" || "youtube" ? "max-w-72 min-h-64" : "max-w-48 min-h-48"
    }
    const [hover , setHover] = useState(false);
    return <div>
        <div className={`${sizeStyles[props.size]} ${defaultStyles} ${hoverStyles} ${hover ? "bg-gradient-to-br from-transparent to-purple-1000/20" : "bg-white"}`} onMouseOver={() => {setHover(true)}} onMouseLeave={() => setHover(false)}>
            <div className="flex p-3 items-center justify-between">
                <div className="flex items-center">
                    <div className={`pr-6 `}>
                        <ShareIcon size="sm" />
                    </div>
                    <div className={`font-medium ${hover ? "text-purple-1200" : ""}`}>
                        {props.title}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`hover:text-red-900 ${hoverStyles} text-gray-500`}>
                        <TrashIcon size="sm" />
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
                {props.type === "tweet" && <blockquote className="twitter-tweet w-full max-w-full"
                        >
                    <a href={props.link.replace("x.com" , "twitter.com")}
                    ></a>
                </blockquote>}
            </div>
        </div>
    </div>
}



// import { useState } from "react";
// import { ShareIcon } from "../icons/ShareIcon";
// import { TrashIcon } from "../icons/TrashIcon";

// interface CardProps {
//   size: "md" | "sm";
//   title: string;
//   type: "youtube" | "tweet";
//   link: string;
// }

// export const Card = ({ size, title, type, link }: CardProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`group relative overflow-hidden ${
//         size === "md" ? "w-96" : "w-80"
//       } bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-purple-200`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Header Section */}
//       <div className="flex items-center justify-between p-4 pb-2">
//         <div className="flex items-center space-x-2">
//           <button className="p-1.5 rounded-lg hover:bg-purple-50 text-gray-500 hover:text-purple-600 transition-colors">
//             <ShareIcon size="md" />
//           </button>
//           <h3 className={`font-medium ${isHovered ? "text-purple-700" : "text-gray-800"}`}>
//             {title}
//           </h3>
//         </div>
//         <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
//           <TrashIcon size="md" />
//         </button>
//       </div>

//       {/* Content Section */}
//       <div className="p-4 pt-2">
//         {type === "youtube" && (
//           <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm">
//             <iframe
//               src={link.replace("watch", "embed").replace("?v=", "/")}
//               className="absolute w-full h-full"
//               title="YouTube video player"
//               allowFullScreen
//             />
//           </div>
//         )}

//         {type === "tweet" && (
//           <div className="relative min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
//             <a
//               href={link.replace("x.com", "twitter.com")}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-purple-600 hover:text-purple-700 text-sm font-medium"
//             >
//               View Tweet on Twitter
//             </a>
//           </div>
//         )}
//       </div>

//       {/* Hover Overlay */}
//       {isHovered && (
//         <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-transparent pointer-events-none" />
//       )}
//     </div>
//   );
// };