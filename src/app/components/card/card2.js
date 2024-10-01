'use client';
import React from "react";
import {MdOutlineCreate} from "react-icons/md";

 const Card2 =({heading,children, className,className1,onclick,showButton = true ,text}) => {
    return (
        <div className="w-full">
            <div
                className={`bg-white shadow-custom mb-4 border-custom rounded-lg min-h-[41vh] ${className1}`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h5 className={`font-bold ${className}`}>{heading}</h5>
                    {showButton &&
                        <button
                            className=" flex items-center px-4 py-1 bg-white hover:text-blue-600 hover:border-blue-600 border border-gray-300 rounded text-gray-700 flex items-center"
                            onClick={onclick}>
                            <MdOutlineCreate className="mr-2"/>{text}
                        </button>}
                </div>
                {/* End Header */}
                {/* Body */}
                <div>
                    {children}
                </div>
                {/* End Body */}
            </div>
            {/* End Card */}
        </div>
    )
 };


export default Card2;