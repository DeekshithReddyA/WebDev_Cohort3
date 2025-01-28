import { ReactElement } from "react";

export interface ButtonProps{
    variant:  "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text: string;
    startIcon ?: ReactElement;
    onClick: () => void;
}
const defaultStyles = "rounded-lg";
const variantStyles = {
    "primary" : "bg-purple-1200 text-white",
    "secondary" : "bg-purple-1000 text-black"
}
const sizeStyles = {
    "sm" : "py-1.5 px-2 text-sm",
    "md" : "py-2 px-3 text-lg",
    "lg" : "py-3 px-4 text-2xl"
}

const hoverStyles = "hover:scale-[1.02] transition-all duration-300 object-contain"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${hoverStyles}`}>
        <div className={`flex item-center`}>
            <div className="pr-2">
            {props.startIcon}
            </div>
        {props.text}
        </div>
        </button>
}