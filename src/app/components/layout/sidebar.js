'use client';

import Image from "next/image";
import logo from '../../assets/svg/logo.svg'
import {useEffect, useState} from "react";
import Link from "next/link";
import {FaChevronDown, FaChevronUp, FaRegCalendarCheck, FaUser} from "react-icons/fa";
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
    const [activeTab, setActiveTab] = useState('dashboard');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
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
        handleTabChange('users')
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
                            <Link href="../../dashboard"> <span
                                className={`flex items-center ${activeTab === 'dashboard' ? 'text-blue-500' : ''}`}
                                onClick={() => handleTabChange('dashboard')}
                            >
                                <IoHomeOutline className="mr-2"/> Dashboard
                            </span>
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
                            <li
                                // className="cursor-pointer hover:text-blue-600"
                                className={`cursor-pointer hover:text-blue-600 ${activeTab === 'users' ? 'text-blue-500' : ''}`}
                                onClick={() => handleTabChange('users')}>
                                <button
                                    type="button"
                                    onClick={toggleDropdown2}
                                    className="hover:text-blue-600 flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group"
                                    aria-controls="dropdown-example"
                                    aria-expanded={isDropdownOpen2}
                                >
                                    <FaUser/>
                                    <span
                                        className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'users' ? 'text-blue-500' : ''}`}
                                        onClick={() => handleTabChange('users')}>Users</span>
                                    {isDropdownOpen2 ? <FaChevronUp/> : <FaChevronDown/>}
                                </button>
                                <ul
                                    id="dropdown-example"
                                    className={`${isDropdownOpen2 ? 'block' : 'hidden'} py-2 space-y-2`}
                                >
                                    <li>
                                        <Link
                                            href="../../pages/users"
                                            className={`cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${activeTab === 'users' ? 'text-blue-500' : 'text-blue-500'}`}
                                            onClick={() => handleTabChange('users')}
                                        >
                                            <div
                                                className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                                            Users
                                        </Link>

                                    </li>
                                    <li>
                                        <Link
                                            href="../../pages/user_profile"
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
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <Link href="#"
                                      className={`flex items-center ${activeTab === 'inventory' ? 'text-blue-500' : ''}`}
                                      onClick={() => handleTabChange('inventory')}>
                                    <MdOutlineInventory2 className="mr-2"/>Inventory
                                </Link>
                            </li>
                            <li className="flex items-center w-full pl-4 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                <Link href="../../pages/user_profile"
                                      className={`flex items-center ${activeTab === 'team' ? 'text-blue-500' : ''}`}
                                      onClick={() => handleTabChange('team')}>
                                    <RiTeamLine className='mr-2'/>Teams
                                </Link>

                            </li>
                        </div>}

                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
