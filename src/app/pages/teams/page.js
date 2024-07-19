import Card from "@/app/components/card/card";
import Link from "next/link";
import {FaEllipsisV} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import rated from '@/app/assets/svg/star.svg'
import rated2 from '@/app/assets/svg/star-half.svg'
import user from '@/app/assets/images/img9.jpg'
import user1 from '@/app/assets/images/img6.jpg'

const Teams = () => {
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
    return(
        <div className="grid grid-cols-3 gap-4">
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#digitalmarketing</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-blue-600 bg-blue-100 rounded px-2 py-1">Marketing team</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#ethereum</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-blue-600 bg-blue-100 rounded px-2 py-1">Marketing team</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#conference</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-blue-600 bg-blue-100 rounded px-2 py-1">Marketing team</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#supportteam</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-blue-600 bg-blue-100 rounded px-2 py-1">Marketing team</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#invoices</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-blue-600 bg-blue-100 rounded px-2 py-1">Marketing team</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#payments</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-blue-600 bg-blue-100 rounded px-2 py-1">Marketing team</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between">
                    <Link href="#" className="text-blue-600 text-lg">#event</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                            onClick={toggleDropdown}
                        >
                            <FaEllipsisV/>
                        </button>
                        {isDropdownOpen && (<div
                            className="absolute right-0 w-98 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white rounded-lg shadow-custom-shadow">
                            <Link
                                className="flex items-center gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                href="#">
                                Rename team
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Add to favorites
                            </Link>
                            <Link
                                className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-4 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Archive team
                            </Link>
                            <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                            <Link
                                className="hover:bg-gray-100 xs-custom w-full py-1.5 px-4 clear-both font-normal text-red whitespace-nowrap bg-transparent border-0"
                                href="#">
                                Delete
                            </Link>
                        </div>)}
                    </div>
                </div>
                <p>Our group promotes and sells products and services by leveraging online marketing tactics</p>
                <div className="my-4">
                    <div className="flex justify-between items-center py-2">
                        <p>INDUSTRY:</p>
                        <button className="text-black bg-gray-200 rounded px-2 py-1">Organizers</button>
                    </div>
                    <div className="flex justify-between py-2 border-y border-inherite items-center">
                        <p>RATED:</p>
                        <div className="flex px-2 py-1">
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated} alt='rated'/>
                            <Image src={rated2} alt='rated'/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
};
export default Teams;