'use client';

import Image from "next/image";
import logo from '../../assets/svg/logo.svg'
import {useEffect, useState} from "react";
import Link from "next/link";
import {FaRegCalendarCheck, FaUser} from "react-icons/fa";
import {MdOutlineInventory2} from "react-icons/md";
import {RiTeamLine} from "react-icons/ri";
import {FcLeave} from "react-icons/fc";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "@/app/slices/authSlice";
import {IoHomeOutline} from "react-icons/io5";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [isEndUser, setIsEndUser] = useState(false);
    const {user, users, singleUser,loading,error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    useEffect(() => {
    if (singleUser) {
        const isEndUser = singleUser.role === "admin";
        setIsEndUser(isEndUser);
        console.log("Is there an enduser?", isEndUser);
    } else {
        console.log("Single user is empty or undefined");
    }
}, [singleUser]);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown2 = () => {
        setIsDropdownOpen2(!isDropdownOpen2);
    }
    const toggleDropdown4 = () => {
        setIsDropdownOpen4(!isDropdownOpen4);
    }
    return (
        <div>
            <button
                onClick={toggleSidebar}
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="fixed z-[60] inline-flex left-[152px] top-[10px] items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >

                <div className="h-full px-3 py-4 overflow-y-auto border border-r bg-white">
                    <div className="pb-[10px] pl-[10px]">
                        <Image src={logo} alt='logo' className="w-full min-w-[6.5rem] max-w-[5.5rem]"/>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                            <Link href="../../dashboard" className='flex items-center'>
                                <IoHomeOutline className='mr-2'/> Dashboard
                            </Link>
                        </li>
                        {!isEndUser && <div className='mt-2'>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <FaUser className='mr-2'/>Profile
                            </li>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <MdOutlineInventory2 className='mr-2'/>Inventory
                            </li>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <RiTeamLine className='mr-2'/>Team
                            </li>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <FcLeave className='mr-2'/>Leave
                            </li>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <FaRegCalendarCheck className='mr-2'/>Attendance
                            </li>
                        </div>}
                        {isEndUser && <div>
                            <li className="pl-8 py-2 text-neutral-400">Users</li>
                            <li className="cursor-pointer hover:text-blue-600">
                                <button
                                    type="button"
                                    onClick={toggleDropdown2}
                                    className="hover:text-blue-600 flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group"
                                    aria-controls="dropdown-example"
                                    aria-expanded={isDropdownOpen2}
                                >
                                    <FaUser/>
                                    <span
                                        className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600">Users</span>
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                <ul
                                    id="dropdown-example"
                                    className={`${isDropdownOpen2 ? 'block' : 'hidden'} py-2 space-y-2`}
                                >
                                    <li>
                                        <Link
                                            href="../../pages/allusers"
                                            className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <div
                                                className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                                            Users
                                        </Link>

                                    </li>
                                    <li>
                                        <Link
                                            href="../../pages/usersprofiles"
                                            className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <div
                                                className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                                            User Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="../../signUp"
                                            className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <div
                                                className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                                            Create User
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="cursor-pointer hover:text-blue-600">
                                <button
                                    type="button"
                                    onClick={toggleDropdown4}
                                    className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls="dropdown-example"
                                    aria-expanded={isDropdownOpen4}
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 21"
                                    >
                                        <path
                                            d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                    </svg>
                                    <span
                                        className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer hover:text-blue-600">Inventory</span>
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                <ul
                                    id="dropdown-example"
                                    className={`${isDropdownOpen4 ? 'block' : 'hidden'} py-2 space-y-2`}
                                >
                                    <li>
                                        <Link
                                            href="#"
                                            className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Reset Password
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <RiTeamLine className='mr-2'/>Teams
                            </li>
                        </div>}

                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
