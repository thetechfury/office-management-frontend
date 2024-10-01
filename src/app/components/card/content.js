import React from "react";

const Content = ({label,children,className}) =>{
  return (
      <ul className="space-y-3 text-black mb-3 px-4 mt-2 max-h-[31vh] overflow-y-auto">
          <li className="py-0">
              <small className={`text-gray-500 ${className}`}>{label}</small>
          </li>
          {children}
      </ul>
  )
};

export default Content;