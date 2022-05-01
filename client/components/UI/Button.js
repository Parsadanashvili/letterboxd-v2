import React from "react";

const Button = React.forwardRef(function Button ({onClick, className, children}, ref) {
    return (
        <button onClick={onClick} ref={ref} className={className + " bg-[#E9A6A6] cursor-pointer rounded-2xl text-lg text-[#1F1D36]"}>{children}</button>
    )
})

export default Button
