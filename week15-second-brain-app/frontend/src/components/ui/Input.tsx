interface InputFormProps {
    placeholder : string;
    onChange : () => void;

}

export const Input = (props: InputFormProps) => {
    return (
        <div>
            <input className="px-4 py-2 border rounded m-2" placeholder={props.placeholder} type="text" onChange={props.onChange}></input>
        </div>
    )
}