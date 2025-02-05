interface TextAreaProps {
    name : string;
    value : string;
    onChange : any;
    placeholder : string;
}

export const TextArea = ({name , value , onChange , placeholder} : TextAreaProps ) => {
    return <div className="hover:scale-[1.02] transition-all duration-300 object-contain">
    <textarea name={name} value={value} onChange={onChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}></textarea>
    </div>
}