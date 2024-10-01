import React from "react";

const Button = ({text,icon, onClick}) => {
    return(
        <>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded flex items-center" onClick={onClick}>
                {icon}{text}
            </button>
        </>
    )
};
export default Button;