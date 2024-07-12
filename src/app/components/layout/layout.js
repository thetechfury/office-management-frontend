
'use client';
import React, {useEffect} from 'react'
import Navbar from "@/app/components/layout/navbar";
import {useSelector} from "react-redux";

const Layout = ({ children }) => {
     const { user } = useSelector((state) => state.auth);
  return (
      <>
          {user && <Navbar/>}
              {children}
      </>
  )
}

export default Layout