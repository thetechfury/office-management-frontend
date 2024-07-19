'use client'
'use client';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile} from '@/app/api/getUserProfileApi';
import MainDiv from '@/app/components/mainDiv/mainDiv';
import Image from "next/image";
import profileImg from '@/app/assets/images/img9.jpg'
import Link from "next/link";
import {CiLocationOn, CiShare2, CiUser} from "react-icons/ci";
import {MdGroup, MdLocationCity, MdOutlineAlternateEmail} from "react-icons/md";
import {BsCalendar4Week} from "react-icons/bs";
import {FaChevronRight, FaEllipsisV, FaUserPlus} from "react-icons/fa";
import {SlBan, SlList} from "react-icons/sl";
import {RiInformationLine} from "react-icons/ri";
import Card from "@/app/components/card/card";
import {PiBriefcaseThin} from "react-icons/pi";
import {BiSolidCity} from "react-icons/bi";
import {IoPhonePortraitOutline} from "react-icons/io5";
import {FaUserGroup} from "react-icons/fa6";
import Teams from "@/app/pages/teams/page";

const UserProfile = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.userProfile);
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }
    useEffect(() => {
            dispatch(getUserProfile());
    }, [dispatch]);
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
        <MainDiv>
        <div className="container mx-auto px-4">
            <div className="flex justify-center">
                <div className="lg:w-10/12">
                    <div className="bg-profile-image bg-cover top-0 left-0 right-0 h-[10rem] rounded-lg"></div>
                    <div className="text-center mb-5">

                        <div
                            className="relative inline-block w-32 h-32 rounded-full border-4 border-white bg-white mt-[-6.3rem]">
                            <Image className="w-full h-full rounded-full object-cover"
                                   src={profileImg} alt="Image Description"/>
                            <span
                                className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>


                        <h1 className="text-2xl font-semibold mt-4">Ella Lauda
                            <i className="tio-verified text-primary ml-1" data-toggle="tooltip" data-placement="top"
                               title="Top endorsed"></i>
                        </h1>


                        <ul className="flex justify-center space-x-4 mt-2">

                            {userProfile.address && (<>
                                <li className="flex items-center">
                                    <MdLocationCity className="tio-city mr-1"/>
                                    <span>{userProfile.address.city}</span>
                                </li>
                                <li className="flex items-center">
                                    <CiLocationOn className="tio-poi-outlined mr-1"/>
                                    <Link href="#"
                                          className="hover:text-blue-600 text-blue-600 ml-1">{userProfile.address.state},{userProfile.address.country}</Link>
                                </li>
                            </>)}
                            {userProfile.user && (<>
                                <li className="flex items-center">
                                    <BsCalendar4Week className="tio-date-range mr-1"/>
                                    <span>{userProfile.user.date_joined}</span>
                                </li>
                            </>)}

                        </ul>
                    </div>
                    <div className="relative mb-5">
                          <span className="hidden absolute left-0 top-0">
                            <a className="inline-block p-2" href="javascript:;">
                              <i className="tio-chevron-left"></i>
                            </a>
                          </span>

                        <span className="hidden absolute right-0 top-0">
                                <a className="inline-block p-2" href="javascript:;">
                                  <i className="tio-chevron-right"></i>
                                </a>
                              </span>

                        <ul className="flex space-x-4 border-b border-gray-200">
                            <li>
                                <Link className="px-4 py-2 hover:text-blue-600 border-b-2 border-blue-500 text-blue-500"
                                      href="#">Profile</Link>
                            </li>
                            <li>
                                <Link className="px-4 py-2 hover:text-blue-600" href="#">Teams</Link>
                            </li>


                            <li className="!ml-auto flex items-center space-x-2 pb-2">
                                <Link
                                    className="px-4 py-2 bg-white hover:text-blue-600 border border-gray-300 rounded text-gray-700 flex items-center"
                                    href="#">
                                    <FaUserPlus className="tio-user-add mr-2"/> Connect
                                </Link>

                                <Link
                                    className="p-3 bg-white border hover:text-blue-600 border-gray-300 rounded text-gray-700 flex items-center"
                                    href="#">
                                    <SlList className="tio-format-points"/>
                                </Link>


                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        className="p-3 bg-white border hover:text-blue-600 border-gray-300 rounded text-gray-500 flex items-center"
                                        onClick={toggleDropdown}
                                    >
                                        <FaEllipsisV className="tio-more-vertical"/>
                                    </button>

                                    {isDropdownOpen && (<div
                                        className="absolute right-0 mt-4 py-4 w-56 bg-white dark:bg-gray-700  card-header-second-child shadow-custom-shadow">
                                            <span
                                                className="block px-6 py-2 text-gray-500">Settings</span>

                                        <Link
                                            className="block px-6 py-2 text-black hover:bg-gray-100 flex items-center"
                                            href="#">
                                            <CiShare2 className="text-gray-500 mr-2"/> Share profile
                                        </Link>
                                        <Link
                                            className="block px-6 py-2 text-black hover:bg-gray-100 flex items-center"
                                            href="#">
                                            <SlBan className="text-gray-500 mr-2"/> Block page and profile
                                        </Link>
                                        <Link
                                            className="block px-6 py-2 text-black hover:bg-gray-100 flex items-center"
                                            href="#">
                                            <RiInformationLine className="text-gray-500 mr-2"/> Suggest edits
                                        </Link>

                                        <div className="border-t border-gray-200 my-1"></div>

                                        <span
                                            className="block px-6 py-2 text-gray-500">Feedback</span>

                                        <Link
                                            className="block px-6 py-2 text-black hover:bg-gray-100 flex items-center"
                                            href="#">
                                            <RiInformationLine className="text-gray-500 mr-2"/> Report
                                        </Link>
                                    </div>)}
                                </div>
                                {/*<div className="relative" ref={dropdownRef}>*/}
                                {/*    <button*/}
                                {/*        className="flex items-center"*/}
                                {/*        onClick={toggleDropdown}*/}
                                {/*    >*/}
                                {/*        <div className="avatar avatar-sm avatar-circle">*/}
                                {/*            <Image className="avatar-img w-8 h-8 rounded-full" src={profileImg}*/}
                                {/*                   alt="profile image"/>*/}
                                {/*            <span*/}
                                {/*                className="avatar-status avatar-sm-status avatar-status-success"></span>*/}
                                {/*        </div>*/}
                                {/*    </button>*/}

                                {/*    {isDropdownOpen && (*/}
                                {/*        <div*/}
                                {/*            className="absolute right-0 mt-8 pb-4*/}
                                {/*     w-64 bg-white dark:bg-gray-700 rounded-lg shadow-custom-shadow">*/}


                                {/*            /!*    {userProfile ? (*!/*/}
                                {/*            /!*        <div>*!/*/}
                                {/*            /!*            {userProfile.user && (*!/*/}
                                {/*            /!*                <>*!/*/}
                                {/*            /!*                    <p>Email: {userProfile.user.email}</p>*!/*/}
                                {/*            /!*                    <p>Role: {userProfile.user.role}</p>*!/*/}
                                {/*            /!*                    <p>Full Name: {userProfile.user.full_name}</p>*!/*/}
                                {/*            /!*                </>*!/*/}
                                {/*            /!*            )}*!/*/}
                                {/*            /!*            <p>Date of Birth: {userProfile.date_of_birth}</p>*!/*/}
                                {/*            /!*            <p>Bio: {userProfile.bio}</p>*!/*/}
                                {/*            /!*            <p>Phone: {userProfile.phone}</p>*!/*/}
                                {/*            /!*            /!* Handle null or missing profile image *!/*!/*/}
                                {/*            /!*            <p>Profile Image: {userProfile.profile_image ?*!/*/}
                                {/*            /!*                <img src={userProfile.profile_image} alt="Profile"/> : "No image available"}</p>*!/*/}
                                {/*            /!*            /!* Display address if available *!/*!/*/}
                                {/*            /!*            {userProfile.address && <p>Address: {userProfile.address}</p>}*!/*/}
                                {/*            /!*            /!* Display skills if available *!/*!/*/}
                                {/*            /!*            {userProfile.skills && userProfile.skills.length > 0 && (*!/*/}
                                {/*            /!*                <div>*!/*/}
                                {/*            /!*                    <h3>Skills</h3>*!/*/}
                                {/*            /!*                    <ul>*!/*/}
                                {/*            /!*                        {userProfile.skills.map((skill, index) => (*!/*/}
                                {/*            /!*                            <li key={index}>{skill}</li>*!/*/}
                                {/*            /!*                        ))}*!/*/}
                                {/*            /!*                    </ul>*!/*/}
                                {/*            /!*                </div>*!/*/}
                                {/*            /!*            )}*!/*/}
                                {/*            /!*            /!* Display education if available *!/*!/*/}
                                {/*            /!*            {userProfile.educations && userProfile.educations.length > 0 && (*!/*/}
                                {/*            /!*                <div>*!/*/}
                                {/*            /!*                    <h3>Education</h3>*!/*/}
                                {/*            /!*                    <ul>*!/*/}
                                {/*            /!*                        {userProfile.educations.map((education, index) => (*!/*/}
                                {/*            /!*                            <li key={index}>{education}</li>*!/*/}
                                {/*            /!*                        ))}*!/*/}
                                {/*            /!*                    </ul>*!/*/}
                                {/*            /!*                </div>*!/*/}
                                {/*            /!*            )}*!/*/}
                                {/*            /!*            /!* Display experience if available *!/*!/*/}
                                {/*            /!*            {userProfile.experience && userProfile.experience.length > 0 && (*!/*/}
                                {/*            /!*                <div>*!/*/}
                                {/*            /!*                    <h3>Experience</h3>*!/*/}
                                {/*            /!*                    <ul>*!/*/}
                                {/*            /!*                        {userProfile.experience.map((exp, index) => (*!/*/}
                                {/*            /!*                            <li key={index}>{exp}</li>*!/*/}
                                {/*            /!*                        ))}*!/*/}
                                {/*            /!*                    </ul>*!/*/}
                                {/*            /!*                </div>*!/*/}
                                {/*            /!*            )}*!/*/}
                                {/*            /!*        </div>*!/*/}
                                {/*            /!*    ) : (*!/*/}
                                {/*            /!*        <p>No user profile data available.</p>*!/*/}
                                {/*            /!*    )}*!/*/}
                                {/*            /!*</div>*!/*/}


                                {/*            <div className="px-4 py-3">*/}
                                {/*                <div className="flex items-center">*/}
                                {/*                    <div className="mr-2">*/}
                                {/*                        <Image className="avatar-img w-8 h-8 rounded-full"*/}
                                {/*                               src={profileImg}*/}
                                {/*                               alt="profile image"/>*/}
                                {/*                    </div>*/}
                                {/*                    <div>*/}
                                {/*                            <span*/}
                                {/*                                className="block font-bold text-gray-900 dark:text-white">Mark Williams</span>*/}
                                {/*                        <span*/}
                                {/*                            className="block text-gray-500 dark:text-gray-300">mark@example.com</span>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="border-t border-gray-200 dark:border-gray-600"></div>*/}

                                {/*            <button*/}
                                {/*                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"*/}
                                {/*                onClick={toggleSubmenu1}*/}
                                {/*            >*/}
                                {/*                <span className="text-truncate pr-2">Set status</span>*/}
                                {/*                {isSubmenuOpen1 ? <FaChevronUp/> : <FaChevronDown/>}*/}
                                {/*            </button>*/}
                                {/*            {isSubmenuOpen1 && (*/}
                                {/*                <div className="ml-4">*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Available</a>*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Busy</a>*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Away</a>*/}
                                {/*                    <div*/}
                                {/*                        className="border-t border-gray-200 dark:border-gray-600"></div>*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Reset*/}
                                {/*                        status</a>*/}
                                {/*                </div>*/}
                                {/*            )}*/}

                                {/*            <a href="#"*/}
                                {/*               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Profile &amp; account</a>*/}
                                {/*            <a href="#"*/}
                                {/*               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Settings</a>*/}
                                {/*            <div className="border-t border-gray-200 dark:border-gray-600"></div>*/}
                                {/*            <div className="px-4 py-2">*/}
                                {/*                <div className="flex items-center">*/}
                                {/*                    <div*/}
                                {/*                        className="w-8 h-8 bg-gray-800 rounded-full mr-2 flex items-center justify-center text-white">*/}
                                {/*                        HS*/}
                                {/*                    </div>*/}
                                {/*                    <div>*/}
                                {/*                <span*/}
                                {/*                    className="block font-bold text-gray-900 dark:text-white">Htmlstream</span>*/}
                                {/*                        <span*/}
                                {/*                            className="block text-gray-500 dark:text-gray-300">hs.example.com</span>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="border-t border-gray-200 dark:border-gray-600"></div>*/}

                                {/*            <button*/}
                                {/*                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"*/}
                                {/*                onClick={toggleSubmenu2}*/}
                                {/*            >*/}
                                {/*                <span className="text-truncate pr-2">Customization</span>*/}
                                {/*                {isSubmenuOpen2 ? <FaChevronUp/> : <FaChevronDown/>}*/}
                                {/*            </button>*/}
                                {/*            {isSubmenuOpen2 && (*/}
                                {/*                <div className="ml-4">*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Invite*/}
                                {/*                        people</a>*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Analytics</a>*/}
                                {/*                    <a href="#"*/}
                                {/*                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Customize*/}
                                {/*                        Front</a>*/}
                                {/*                </div>*/}
                                {/*            )}*/}

                                {/*            <a href="#"*/}
                                {/*               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Manage*/}
                                {/*                team</a>*/}
                                {/*            <div className="border-t border-gray-200 dark:border-gray-600"></div>*/}
                                {/*            <button*/}
                                {/*                onClick={handleLogout}*/}
                                {/*                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Sign*/}
                                {/*                out*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                            </li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full ">
                            {/* Card */}
                            <Card classes="p-3 shadow-custom border-custom">
                                <h5 className="font-bold">Complete your profile</h5>
                                {/* Progress */}
                                <div className="flex justify-between items-center">
                                    <div className="w-full bg-gray-200 rounded h-2.5 flex-grow-1">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded"
                                            role="progressbar"
                                            style={{width: "82%"}}
                                            aria-valuenow={82}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <span className="ml-4">82%</span>
                                </div>
                                {/* End Progress */}
                            </Card>
                            {/* End Card */}

                            {/* Card */}
                            <div
                                className="mt-10 bg-white shadow-custom mb-6 lg:mb-10 border-custom rounded-lg"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-gray-200">
                                    <h5 className="font-bold">Profile</h5>
                                </div>
                                {/* End Header */}
                                {/* Body */}
                                <div className="p-4">
                                    <ul className="space-y-3 text-black mb-3">
                                        <li className="py-0">
                                            <small className="text-gray-500">About</small>
                                        </li>
                                        <li className="flex items-center ">
                                            <CiUser className="mr-2"/>
                                            Ella Lauda
                                        </li>
                                        <li className="flex items-center">
                                            <PiBriefcaseThin className=" mr-2"/>
                                            No department
                                        </li>
                                        <li className="flex items-center">
                                            <BiSolidCity className=" mr-2"/>
                                            Htmlstream
                                        </li>
                                        <li className="pt-2 pb-0">
                                            <small className="text-gray-500">Contacts</small>
                                        </li>
                                        <li className="flex items-center">
                                            <MdOutlineAlternateEmail className="mr-2"/>
                                            ella@example.com
                                        </li>
                                        <li className="flex items-center">
                                            <IoPhonePortraitOutline className=" mr-2"/>
                                            +1 (609) 972-22-22
                                        </li>
                                        <li className="pt-2 pb-0">
                                            <small className="text-gray-500">Teams</small>
                                        </li>
                                        <li className="flex items-center">
                                            <MdGroup className=" mr-2"/>
                                            Member of 7 teams
                                        </li>
                                        <li className="flex items-center">
                                            <PiBriefcaseThin className="mr-2"/>
                                            Working on 8 projects
                                        </li>
                                    </ul>
                                </div>
                                {/* End Body */}
                            </div>
                            {/* End Card */}
                        </div>
                        <div className="w-full">
                            {/* Card */}
                            <div className="bg-white shadow-custom border-custom rounded-lg mb-6 lg:mb-10">
                                {/* Header */}
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                    <h5 className="font-bold">Teams</h5>
                                </div>
                                <div className="p-4">
                                    <ul className="space-y-3 text-black mb-3 ">
                                        <li className="flex ">
                                            <FaUserGroup className="mr-2 mt-1 opacity-50"/>
                                            <div className="grid">
                                                <span>#digitalmarketing</span>
                                                <span className="text-gray-500">8 members</span>
                                            </div>

                                        </li>
                                        <li className="flex">
                                            <FaUserGroup className=" mr-2 mt-1 opacity-50"/>
                                            <div className="grid">
                                                <span>#ethereum</span>
                                                <span className="text-gray-500">14 members</span>
                                            </div>

                                        </li>
                                        <li className="flex">
                                            <FaUserGroup className=" mr-2 mt-1 opacity-50"/>
                                            <div className="grid">
                                                <span>#conference</span>
                                                <span className="text-gray-500">3 members</span>
                                            </div>

                                        </li>
                                        <li className="flex">
                                            <FaUserGroup className=" mr-2 mt-1 opacity-50"/>
                                            <div className="grid">
                                                <span>#supportteam</span>
                                                <span className="text-gray-500">3 members</span>
                                            </div>

                                        </li>
                                        <li className="flex">
                                            <FaUserGroup className=" mr-2 mt-1 opacity-50"/>
                                            <div className="grid">
                                                <span>#invoices</span>
                                                <span className="text-gray-500">3 members</span>
                                            </div>

                                        </li>
                                    </ul>
                                </div>

                                {/* Footer */}
                                <div className="card-footer border-t border-inherit py-6 flex justify-center">
                                    <button
                                        className="btn text-blue-600 flex items-center"
                                        onClick={toggleCollapse}
                                    >
                                        View all teams <FaChevronRight className="ml-2"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*{userProfile ? (<div>*/}
                    {/*    {userProfile.user && (<>*/}
                    {/*        <p>Email: {userProfile.user.email}</p>*/}
                    {/*        <p>Role: {userProfile.user.role}</p>*/}
                    {/*        <p>Full Name: {userProfile.user.full_name}</p>*/}
                    {/*        <p>Date joined: {userProfile.user.date_joined}</p>*/}
                    {/*    </>)}*/}
                    {/*    <p>Date of Birth: {userProfile.date_of_birth}</p>*/}
                    {/*    <p>Bio: {userProfile.bio}</p>*/}
                    {/*    <p>Phone: {userProfile.phone}</p>*/}
                    {/*    <p>*/}
                    {/*        Profile Image: {userProfile.profile_image ? (*/}
                    {/*        <img src={userProfile.profile_image} alt="Profile"/>) : ("No image available")}*/}
                    {/*    </p>*/}
                    {/*    {userProfile.address && (<>*/}
                    {/*        <p>City: {userProfile.address.city}</p>*/}
                    {/*        <p>State: {userProfile.address.state}</p>*/}
                    {/*        <p>Country: {userProfile.address.country}</p>*/}
                    {/*        <p>Street: {userProfile.address.street}</p>*/}
                    {/*    </>)}*/}
                    {/*    {userProfile.skills && userProfile.skills.length > 0 && (<div>*/}
                    {/*        <h3>Skills</h3>*/}
                    {/*        <ul>*/}
                    {/*            {userProfile.skills.map((skill) => (<li key={skill.id}>*/}
                    {/*                <p>Name: {skill.name}</p>*/}
                    {/*                <p>Level: {skill.level}</p>*/}
                    {/*                <p>Description: {skill.description}</p>*/}
                    {/*            </li>))}*/}
                    {/*        </ul>*/}
                    {/*    </div>)}*/}
                    {/*    {userProfile.educations && userProfile.educations.length > 0 && (<div>*/}
                    {/*        <h3>Education</h3>*/}
                    {/*        <ul>*/}
                    {/*            {userProfile.educations.map((education) => (<li key={education.id}>*/}
                    {/*                <p>Degree: {education.degree}</p>*/}
                    {/*                <p>Institute: {education.institute}</p>*/}
                    {/*                <p>Total Marks: {education.total_marks}</p>*/}
                    {/*                <p>Obtain Marks: {education.obtain_marks}</p>*/}
                    {/*                <p>Start Date: {education.start_date}</p>*/}
                    {/*                <p>End Date: {education.end_date}</p>*/}
                    {/*            </li>))}*/}
                    {/*        </ul>*/}
                    {/*    </div>)}*/}
                    {/*    {userProfile.experience && userProfile.experience.length > 0 && (<div>*/}
                    {/*        <h3>Experience</h3>*/}
                    {/*        <ul>*/}
                    {/*            {userProfile.experience.map((exp) => (<li key={exp.id}>*/}
                    {/*                <p>Title: {exp.title}</p>*/}
                    {/*                <p>Company Name: {exp.company_name}</p>*/}
                    {/*                <p>Joining Date: {exp.joining_date}</p>*/}
                    {/*                <p>End Date: {exp.end_date}</p>*/}
                    {/*                <p>Description: {exp.description}</p>*/}
                    {/*                <p>Remarks: {exp.remarks}</p>*/}
                    {/*            </li>))}*/}
                    {/*        </ul>*/}
                    {/*    </div>)}*/}
                    {/*</div>) : (<p>No user profile data available.</p>)}*/}

                    <div><Teams/></div>
                </div>
            </div>
        </div>
    </MainDiv>);
};

export default UserProfile;


