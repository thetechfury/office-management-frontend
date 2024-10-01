import {FaDownload, FaEllipsisV, FaExternalLinkAlt} from "react-icons/fa";
import Link from "next/link";
import {HiArrowTrendingUp} from "react-icons/hi2";
import {TiMessages} from "react-icons/ti";
import Image from "next/image";
import capsule from "@/app/assets/svg/capsule.svg";
import mailchimpImg from "@/app/assets/svg/mailchimp.svg";
import webdevImg from "@/app/assets/svg/google-webdev.svg";
import MonthlyExpenseChart from "@/app/components/chart/monthlyExpenseChart";
import {useEffect, useRef, useState} from "react";
import {CiShare2} from "react-icons/ci";

const BarChartSection = () => {
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
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-6 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="col-span-5 lg:col-span-2 mb-3 lg:mb-5">
                <div className="card h-full border border-inherit rounded-xl">
                    <div
                        className="card-header card-header-first-child flex p-[1.325rem] justify-between items-center border-b">
                        <h5 className="card-header-title">Import data into Front Dashboard</h5>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className=" w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d]"
                                onClick={toggleDropdown}
                            >
                                <FaEllipsisV/>
                            </button>
                            {isDropdownOpen && (<div
                                className="absolute right-0 w-90 py-4 mt-2 border-1 border-inherit rounded-lg  bg-white dark:bg-gray-700 rounded-lg shadow-custom-shadow">
                                    <span
                                        className="uppercase tracking-wide text-80p py-2 px-4">Settings</span>
                                <Link
                                    className="flex items-center gap-2 xs-custom w-full py-1.5 px-6 clear-both font-normal text-black  whitespace-nowrap bg-transparent border-0 hover:bg-gray-100"
                                    href="#">
                                    <CiShare2 className="text-gray-500"/> Share chart
                                </Link>
                                <Link
                                    className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-6 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                    href="#">
                                    <FaDownload className="text-gray-500"/> Download
                                </Link>
                                <Link
                                    className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-6 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                    href="#">
                                    <HiArrowTrendingUp className="text-gray-500"/> Connect other apps
                                </Link>
                                <div className="h-0 my-2 overflow-hidden border-t border-t-custom-gray"></div>
                                <span
                                    className="uppercase tracking-wide text-80p py-2 px-4">Feedback</span>
                                <Link
                                    className="flex items-center hover:bg-gray-100 gap-2 xs-custom w-full py-1.5 px-6 clear-both font-normal text-black whitespace-nowrap bg-transparent border-0"
                                    href="#">
                                    <TiMessages className="text-gray-500"/> Report
                                </Link>
                            </div>)}
                        </div>
                    </div>
                    <div className="card-body p-[1.325rem]">
                        <p className="mb-4">See and talk to your users and leads immediately by importing your data
                            into the Front
                            Dashboard platform.</p>
                        <ul className="list-none p-0">
                            <li className="pt-3 pb-5">
                                <h5 className="modal-title">Import users from:</h5>
                            </li>
                            <li className="py-4 border-y">
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        <Image className="avatar avatar-xs avatar-4by3"
                                               src={capsule} alt="Image Description" width={30} height={30}/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h5 className="mb-0">Capsule</h5>
                                                <span className="text-sm">Users</span>
                                            </div>
                                            <button
                                                className="btn btn-primary bg-blue-500 flex gap-4 leading-4 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                    <span>Launch <span
                                                        className="hidden sm:inline-block">importer</span></span>
                                                <FaExternalLinkAlt/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="py-4 border-y">
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        <Image className="avatar avatar-xs avatar-4by3"
                                               src={mailchimpImg} alt="Image Description" width={30} height={30}/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h5 className="mb-0">Mailchimp</h5>
                                                <span className="text-sm">Users</span>
                                            </div>
                                            <button
                                                className="btn btn-primary bg-blue-500 flex gap-4 leading-4 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                    <span>Launch <span
                                                        className="hidden sm:inline-block">importer</span></span>
                                                <FaExternalLinkAlt/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="py-4 border-y">
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        <Image className="avatar avatar-xs avatar-4by3"
                                               src={webdevImg} alt="Image Description" width={30} height={30}/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h5 className="mb-0">webdevImg</h5>
                                                <span className="text-sm">Users</span>
                                            </div>
                                            <button
                                                className="btn btn-primary bg-blue-500 flex gap-4 leading-4 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                    <span>Launch <span
                                                        className="hidden sm:inline-block">importer</span></span>
                                                <FaExternalLinkAlt/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="py-3 mt-4">
                                <small>Or you can <Link href='#' className="text-blue-600">sync data to Front
                                    Dashboard</Link> to ensure your data
                                    is always up-to-date.</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <MonthlyExpenseChart/>
        </div>

    )
};
export default BarChartSection;