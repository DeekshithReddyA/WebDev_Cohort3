import { ReactElement } from "react";

interface InputFormProps {
    placeholder : string;
    onChange : () => void;
    icon?: ReactElement;
}

export const Input = (props: InputFormProps) => {
    return (
    <form className="max-w-md mx-auto hover:scale-[1.02] transition-all duration-300 object-contain">
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      {props.icon}
    </div>
    <input type="text" id={`${props.placeholder}`} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-1000 focus:border-purple-1000 block w-full ps-10 p-2" placeholder={props.placeholder} />
  </div>
</form>
    )
}