'use client';
import {FaRegBell,} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/slices/authSlice";
import {useRouter} from "next/navigation";
import logo from "@/app/assets/svg/logo.svg";

const BASE_URL = 'http://127.0.0.1:8000';

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {userSingle, singleUser, userAddress} = useSelector(state => state.auth);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleLogout = () => {
        router.push('../../signin');
        dispatch(logout());
        setIsDropdownOpen(false); // Close the dropdown after logging out
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
    return (
        <div
            className="fixed flex items-center z-[1] top-0  w-full bg-white text-black border border-b border-inherit pr-[2rem] ">
            <div className=" pl-[10px]">
                <Image src={logo} alt='logo' className="w-full min-w-[6.5rem] max-w-[5.5rem]"/>

            </div>
            <div className="container ml-auto flex items-center justify-end">
                <ul className="flex items-center">
                    <li className="mx-3 w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d] hidden sm:flex">
                        <FaRegBell/>
                    </li>
                    <li className="nav-item">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center"
                                onClick={toggleDropdown}
                            >
                                <div className="avatar avatar-sm avatar-circle">
                                    <Image className="avatar-img w-8 h-8 rounded-full"
                                           src={singleUser.image ? `${BASE_URL}${singleUser.image}` : '/default-avatar.jpg'}
                                           width={8}
                                           height={8}
                                           alt="profile image"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-6 pb-2
                                     w-64 bg-white dark:bg-gray-700 rounded-lg shadow-custom-shadow">
                                    <div className="px-4 py-3">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <Image className="avatar-img w-8 h-8 rounded-full"
                                                       src={singleUser.image ? `${BASE_URL}${singleUser.image}` : '/default-avatar.jpg'}
                                                       width={8}
                                                       height={8}
                                                       alt="profile image"/>
                                            </div>
                                            <div>
                                                <span
                                                    className="block font-bold text-gray-900 dark:text-white">{singleUser?.full_name}</span>
                                                <span
                                                    className="block text-gray-500 dark:text-gray-300">{userSingle?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Settings</a>
                                    <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;