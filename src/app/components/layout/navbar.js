import React from 'react'
import Sidebar from "@/app/components/layout/sidebar";
import Topbar from "@/app/components/layout/topbar";

const Navbar = ({children}) => {
    return (
        <div>
            <Topbar/>
            <Sidebar/>
            {children}
        </div>
    )
}

export default Navbar