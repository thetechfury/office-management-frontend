import React from "react";

const Button = ({text}) => {
    return(
        <>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                {text}
            </button>
        </>
    )
};
export default Button;