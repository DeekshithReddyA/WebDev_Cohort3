export const Button = ({
    disabled,
    children,
    onClick
}) => {
    return (
        <div onClick={onClick} className={`px-28 py-4 rounded text-white cursor-pointer ${disabled ? "bg-gray-950" : "bg-green-1000"}`}>
            {children}
        </div>
    )
}