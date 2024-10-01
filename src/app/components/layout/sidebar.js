'use client';

import Image from "next/image";
import logo from '../../assets/svg/logo.svg';
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {FaChevronDown, FaChevronUp, FaRegCalendarCheck, FaUser} from "react-icons/fa";
import {MdOutlineInventory2} from "react-icons/md";
import {RiTeamLine} from "react-icons/ri";
import {FcLeave} from "react-icons/fc";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "@/slices/authSlice";
import {IoHomeOutline} from "react-icons/io5";
import {useRouter} from 'next/navigation';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState({isDropdownUsers: false, isDropdownInventory: false});
    const {singleUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'defaultTabName');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const isEndUser = useMemo(() => singleUser?.role === "admin", [singleUser]);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleDropdown = (dropdown) => {
        setDropdownState((prevState) => {
            const newState = {
                isDropdownUsers: false,
                isDropdownInventory: false,
            };
            newState[dropdown] = !prevState[dropdown];
            return newState;
        });
    };

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
                        <Image src={logo} alt="logo" className="w-full min-w-[6.5rem] max-w-[5.5rem]"/>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li className="flex items-center w-full pl-2 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                            <div onClick={() => router.push('../../dashboard')}>
                                <span
                                    className={`flex items-center ${activeTab === 'dashboard' ? 'text-blue-600' : ''}`}
                                    onClick={() => handleTabChange('dashboard')}
                                >
                                    <IoHomeOutline className="mr-2"/> Dashboard
                                </span>
                            </div>
                        </li>
                        {!isEndUser && (
                            <div className="mt-2">
                                <li className="flex items-center w-full pl-4 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                                    <FaUser className="mr-2"/>Profile
                                </li>
                                <li className="flex items-center w-full pl-4 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                                    <MdOutlineInventory2 className="mr-2"/>Inventory
                                </li>
                                <li className="flex items-center w-full pl-4 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                                    <RiTeamLine className="mr-2"/>Team
                                </li>
                                <li className="flex items-center w-full pl-4 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                                    <FcLeave className="mr-2"/>Leave
                                </li>
                                <li className="flex items-center w-full pl-4 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                                    <FaRegCalendarCheck className="mr-2"/>Attendance
                                </li>
                            </div>
                        )}
                        {isEndUser && (
                            <div>
                                <li className="pl-8 py-2 text-neutral-400">Users</li>
                                <li className='cursor-pointer hover:text-blue-600 '
                                    >
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('isDropdownUsers')}
                                        className='hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group'
                                        aria-controls="dropdown-users"
                                        aria-expanded={dropdownState.isDropdownUsers}
                                    >
                                        <FaUser/>
                                        <span
                                            onClick={() => handleTabChange('user')}
                                            className='flex-1 ms-3 text-left rtl:text-right cursor-pointer group-hover:text-blue-600'>
                                            Users
                                        </span>
                                        {dropdownState.isDropdownUsers ? <FaChevronUp/> : <FaChevronDown/>}
                                    </button>
                                    <ul id="dropdown-users"
                                        className={`${dropdownState.isDropdownUsers ? 'block' : 'hidden'} py-2 space-y-2`}>
                                        <li>
                                            <Link
                                                href="../../pages/users"
                                                className='hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 '
                                            >
                                                <div
                                                    className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"/>
                                                <span onClick={() => handleTabChange('users')}
                                               className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'users' ? 'text-blue-600' :'' }`}>
                                                    Users
                                                </span>

                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="../../pages/user_profile"
                                                className='cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                            >
                                                <div
                                                    className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"/>
                                                <span onClick={() => handleTabChange('user_profile')}
                                                      className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'user_profile' ? 'text-blue-600' : ''}`}>
                                                    User Profile
                                                </span>

                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="../../signUp"
                                                className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                <div
                                                    className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"/>
                                                <span onClick={() => handleTabChange('create_user')}
                                                      className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'create_user' ? 'text-blue-600' : ''}`}>
                                                    Create User
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pl-8 py-2 text-neutral-400">Inventory</li>
                                <li className="cursor-pointer">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('isDropdownInventory')}
                                        className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group"
                                        aria-controls="dropdown-inventory"
                                        aria-expanded={dropdownState.isDropdownInventory}
                                    >
                                        <MdOutlineInventory2/>
                                        <span onClick={() => handleTabChange('inventory')}
                                            className='flex-1 ms-3 text-left rtl:text-right group-hover:text-blue-600'>
                                            Inventory
                                        </span>
                                        {dropdownState.isDropdownInventory ? <FaChevronUp/> : <FaChevronDown/>}
                                    </button>
                                    <ul id="dropdown-inventory"
                                        className={`${dropdownState.isDropdownInventory ? 'block' : 'hidden'} py-2 space-y-2`}>
                                        <li>
                                            <Link
                                                href="../../pages/inventory"
                                                className='hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                            >
                                                <div
                                                    className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"/>
                                                <span onClick={() => handleTabChange('overview')}
                                                      className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'overview' ? 'text-blue-600' : ''}`}>
                                                    Overview
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="../../pages/category"
                                                className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                <div
                                                    className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"/>
                                                <span onClick={() => handleTabChange('categories')}
                                                      className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'categories' ? 'text-blue-600' : ''}`}>
                                                    Categories
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="../../pages/products"
                                                className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                <div
                                                    className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"/>
                                                <span onClick={() => handleTabChange('products')}
                                                      className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer text-[#132144] group-hover:text-blue-600 ${activeTab === 'products' ? 'text-blue-600' : ''}`}>
                                                    Products
                                                </span>

                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="flex items-center w-full pl-2 py-2  text-gray-900 cursor-pointer hover:text-blue-600">
                                    <Link href="../../pages/all-teams"
                                          className={`flex items-center ${activeTab === 'team' ? 'text-blue-500' : ''}`}
                                          onClick={() => handleTabChange('team')}>
                                        <RiTeamLine className='mr-2'/>Teams
                                    </Link>
                                </li>
                                <li className="flex items-center w-full pl-2 py-2 text-gray-900 cursor-pointer hover:text-blue-600">
                                    <Link href='../../pages/leave' className={`flex items-center ${activeTab === 'leave' ? 'text-blue-600' : ''}`}
                                          onClick={() => handleTabChange('leave')}>
                                    <FcLeave className="mr-2"/>Leave
                                    </Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
