import { ReactElement } from "react";

export interface ButtonProps{
    variant:  "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text: string;
    startIcon ?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}
const defaultStyles = "rounded-lg";
const variantStyles = {
    "primary" : "bg-purple-1200 text-white",
    "secondary" : "bg-purple-1000 text-black"
}
    
const sizeStyles = {
    "sm" : "py-1.5 px-2 text-base",
    "md" : "py-2 px-3 text-lg",
    "lg" : "py-3 px-4 text-2xl"
}

const hoverStyles = "hover:scale-[1.04] transition-all duration-300 object-contain"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${hoverStyles}`}>
        <div className={`flex items-center`}>
            <div className="pr-1">
            {props.startIcon}
            </div>
            <div className="flex items-center justify-center">
                <div className="font-medium">
                    {props.text}
                </div>
                {props.endIcon}
            </div>
        </div>
        </button>
}