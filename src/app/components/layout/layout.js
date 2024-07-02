
'use client';
import React, {useEffect} from 'react'
import Navbar from "@/app/components/layout/navbar";
import {useSelector} from "react-redux";

const Layout = ({ children }) => {
     const { user } = useSelector((state) => state.auth);
      console.log("User state:", user);
  return (
    <div>
        {user && <Navbar/>}
      {children}
    </div>
  )
}

export default Layout