'use client';

import Image from "next/image";
import logo from '../../assets/svg/logo.svg'
import {Navbar} from "flowbite-react";
import {useState} from "react";
import Link from "next/link";
import {FaUser} from "react-icons/fa";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  }
   const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  }
   const toggleDropdown4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
  }
  return (
      // <div className="fixed top-0 left-0 h-full w-64 bg-white text-black border border-r border-inherit">
      //   <div className="py-[10px] pl-[25px]">
      //     <Image src={logo} alt='logo' className="w-full min-w-[6.5rem] max-w-[5.5rem]"/>
      //   </div>
      //     <ul className="">
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Dashboards</li>
      //         <li className="pl-8 py-2 text-neutral-400">Pages</li>
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Pages</li>
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Apps</li>
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Authentication</li>
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Welcome Page</li>
      //         <li className="pl-8 py-2 text-neutral-400">LAYOUTS</li>
      //         <div className="divide-y divide-slate-300 ">
      //             <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">LAYOUTS</li>
      //             <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Item 8</li>
      //         </div>
      //         <li className="pl-8 py-2 text-neutral-400">DOCUMENTATION</li>
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">DOCUMENTATION</li>
      //         <li className="pl-8 py-2 cursor-pointer hover:text-blue-600">Components</li>
      //     </ul>
      // </div>
       <>
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

               <li className="cursor-pointer hover:text-blue-600">
                 <button
                     type="button"
                     onClick={toggleDropdown}
                     className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group"
                     aria-controls="dropdown-example"
                     aria-expanded={isDropdownOpen}
                 >
                   <svg  x="0px" y="0px"
                       className="group-hover:text-blue-600 flex-shrink-0 w-5 h-5 text-[#132144] transition duration-75"
                        aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor"
                        viewBox="0 0 50 50">
                     <path
                         d="M 24.960938 2.1015625 A 1.0001 1.0001 0 0 0 24.386719 2.3105469 L 1.3867188 20.210938 A 1.0001 1.0001 0 1 0 2.6132812 21.789062 L 4 20.708984 L 4 48 A 1.0001 1.0001 0 0 0 5 49 L 18.832031 49 A 1.0001 1.0001 0 0 0 19.158203 49 L 30.832031 49 A 1.0001 1.0001 0 0 0 31.158203 49 L 45 49 A 1.0001 1.0001 0 0 0 46 48 L 46 20.708984 L 47.386719 21.789062 A 1.0001 1.0001 0 1 0 48.613281 20.210938 L 25.613281 2.3105469 A 1.0001 1.0001 0 0 0 24.960938 2.1015625 z M 25 4.3671875 L 44 19.154297 L 44 47 L 32 47 L 32 29 A 1.0001 1.0001 0 0 0 31 28 L 19 28 A 1.0001 1.0001 0 0 0 18 29 L 18 47 L 6 47 L 6 19.154297 L 25 4.3671875 z M 20 30 L 30 30 L 30 47 L 20 47 L 20 30 z"></path>
                   </svg>
                   <span
                       className="flex-1 ms-3 xs-custom text-left rtl:text-right whitespace-nowrap cursor-pointer hover:text-blue-600">Dashboard</span>
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
                     className={`${isDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}
                 >
                   <li >
                     <Link
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group"
                     >
                       <div className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                       Default
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group"
                     >
                       <div
                           className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                       Alternative
                     </Link>
                   </li>
                 </ul>
               </li>
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
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       <div
                           className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                       Users
                     </Link>

                   </li>
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       <div
                           className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                       User Profile
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       <div
                           className="group-hover:bg-blue-600 w-[10px] h-[10px] bg-[#cdcdcd] rounded-full mr-[10px]"></div>
                       Inventory
                     </Link>
                   </li>
                 </ul>
               </li>
               <li className="cursor-pointer hover:text-blue-600">
                 <button
                     type="button"
                     onClick={toggleDropdown3}
                     className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group "
                     aria-controls="dropdown-example"
                     aria-expanded={isDropdownOpen3}
                 >
                   <svg
                       className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 "
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor"
                       viewBox="0 0 18 21"
                   >
                     <path
                         d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                   </svg>
                   <span
                       className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer hover:text-blue-600">Apps</span>
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
                     className={`${isDropdownOpen3 ? 'block' : 'hidden'} py-2 space-y-2`}
                 >
                   <li>
                     <Link
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Kanban
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Calendar
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Invoice generator
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       File Manager
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
                       className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap cursor-pointer hover:text-blue-600">Authentications</span>
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
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Email Verification
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       2-step Verification
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Welcome Message
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="cursor-pointer hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Error 404
                     </Link>
                   </li>
                   <li>
                     <Link
                         href="#"
                         className="hover:text-blue-600 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Error 500
                     </Link>
                   </li>
                 </ul>
               </li>

               <li>
                 <Link
                     href="#"
                     className="hover:text-blue-600 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                 >
                   <svg
                       className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor"
                       viewBox="0 0 18 20"
                   >
                     <path
                         d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                   </svg>
                   <span className="ms-3 hover:text-blue-600">Welcome Page</span>
                 </Link>
               </li>
               <li className="pl-8 py-2 text-neutral-400">LAYOUTS</li>
               <div className="divide-y divide-slate-300 ">
                 <li>
                   <Link
                       href="#"
                       className="hover:text-blue-600 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                   >
                     <svg
                         className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor"
                         viewBox="0 0 18 18"
                     >
                       <path
                           d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286C10 17.169 10.831 18 11.857 18h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                     </svg>
                     <span className="ms-3">LAYOUTS</span>
                   </Link>
                 </li>
                 <li className="pl-8 py-2 text-neutral-400">DOCUMENTATION</li>
               </div>
               <li>
                 <Link
                     href="#"
                     className="hover:text-blue-600 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                 >
                   <svg
                       className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor"
                       viewBox="0 0 18 18"
                   >
                     <path
                         d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286C10 17.169 10.831 18 11.857 18h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                   </svg>
                   <span className="ms-3">DOCUMENTATION</span>
                 </Link>
               </li>
               <li>
                 <Link
                     href="#"
                     className="hover:text-blue-600 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                 >
                   <svg
                       className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor"
                       viewBox="0 0 20 20"
                   >
                     <path
                         d="M8.5 1a3 3 0 0 0-3 3v.338A4.476 4.476 0 0 0 4 7v9a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7a4.476 4.476 0 0 0-.5-2.662V4a3 3 0 0 0-3-3h-4ZM7 4a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 14 4v.08c-.17-.036-.34-.062-.5-.08H7.5A4.48 4.48 0 0 0 7 7v2.223a4.48 4.48 0 0 0-.5 2.777v-9ZM5.5 8.1A2.5 2.5 0 0 1 7 6.5V7h6v-.5a2.5 2.5 0 0 1 1.5 4.6v2.3A2.5 2.5 0 0 1 13 15h-6a2.5 2.5 0 0 1-1.5-4.6v-2.3ZM8.5 18h6a1.5 1.5 0 0 0 1.5-1.5V10.98a2.481 2.481 0 0 1-.5.52V16.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5V11.5a2.481 2.481 0 0 1-.5-.52v5.52A1.5 1.5 0 0 0 8.5 18Z"/>
                   </svg>
                   <span className="ms-3 hover:text-blue-600">components</span>
                 </Link>
               </li>
             </ul>
           </div>
         </aside>
       </>
  );
};

export default Sidebar;