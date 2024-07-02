'use client';
import Page from "@/app/pages/signUp/page";
import Page from "@/app/pages/signin/page";
import React, {useState} from "react";
import Image from "next/image";
import logo from "@/app/assets/svg/logo.svg";

export default function Authentication() {
     const [isSignUp, setIsSignUp] = useState(false);
      const handleToggleForm = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };
    return (
                            <div className="text-center">
                                <Page />
                            </div>

    )
}