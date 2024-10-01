'use client';
import React, { useEffect, useState } from 'react';
import Navbar from "@/app/components/layout/navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (user) {
        setShowNavbar(true);
    }
  }, [user]);

  return (
    <>
      {user && showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
