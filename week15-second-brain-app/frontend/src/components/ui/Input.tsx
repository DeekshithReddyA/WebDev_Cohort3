import { ReactElement } from "react";

interface InputFormProps {
    placeholder : string;
    onChange ?: any;
    icon?: ReactElement;
    type?: "password" | "search";
    reference?: any;
    name ?: string;
    value ?: string;
}

export const Input = (props: InputFormProps) => {
    return (
    <div className="max-w-md mx-auto hover:scale-[1.02] transition-all duration-300 object-contain">
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none dark:text-white">
      {props.icon}
    </div>
    <input onChange={props.onChange} name={props.name} value={props.value} ref={props.reference} type={props.type || "text"} id={`${props.placeholder}`} className={`bg-white border border-gray-300 bg-gray-100/50 text-sm rounded-lg focus:ring-purple-1000 focus:border-purple-1000 block w-full ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-white`} placeholder={props.placeholder} />
  </div>
</div>
    )
}
