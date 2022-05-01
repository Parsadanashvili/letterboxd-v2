const Button = (props) => {

    return (
        <button className={props.className + " bg-[#E9A6A6] rounded-md text-[#1F1D36]"}>{props.children}</button>
    )
}

export default Button
