'use client';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile} from '@/app/api/getUserProfileApi';
import MainDiv from '@/app/components/mainDiv/mainDiv';
import Image from "next/image";
import profileImg from '@/app/assets/images/img9.jpg'
import Link from "next/link";
import {CiLocationOn, CiUser} from "react-icons/ci";
import {MdGroup, MdLocationCity, MdOutlineAlternateEmail} from "react-icons/md";
import {BsCalendar4Week} from "react-icons/bs";
import {PiBriefcaseThin} from "react-icons/pi";
import {IoPhonePortraitOutline} from "react-icons/io5";
import {FaUserGroup} from "react-icons/fa6";
import Teams from "@/app/pages/teams/page";
import {getUserAddressApi} from "@/app/api/getUserAddressApi";
import {getSingleUserApi} from "@/app/api/getSingleUserApi";
import {usePathname, useRouter} from "next/navigation";
import {getUserEducation} from "@/app/api/getUserEducationApi";
import {getUserExperience} from "@/app/api/getUserExperienceApi";
import Profile from "@/app/pages/users/userProfileData/profile";
import Skills from "@/app/pages/users/userProfileData/skills";
import Education from "@/app/pages/users/userProfileData/education";
import WorkExperience from "@/app/pages/users/userProfileData/workExperience";



const UserProfileDetail = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.userProfile);
    const {userAddress, userSingle, user, userEducation, userExperience,singleUser} = useSelector(state => state.auth)
    const [activeTab, setActiveTab] = useState('profile');
    const router = useRouter();
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;

    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                router.push('../../../signin'); // Redirect to signin if not logged in
            }, 100);
        }
    }, [user, router]);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (id) {
            dispatch(getUserProfile(id));
        }
    }, [id, dispatch]);
    useEffect(() => {
        if (id) {
            dispatch(getUserAddressApi(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getSingleUserApi(id));
        }
    }, [id, dispatch]);
    useEffect(() => {
        if (id) {
            dispatch(getUserEducation(id));
        }
    }, [id, dispatch]);
    useEffect(() => {
        if (id) {
            dispatch(getUserExperience(id));
        }
    }, [id, dispatch]);

    const card2Props = {
        heading: 'Profile',
        lable1: 'About',
        lable2: 'Contacts',
        lable3: 'Teams',
        icon: <CiUser/>,
        icon2: <PiBriefcaseThin/>,
        icon3: <MdOutlineAlternateEmail/>,
        icon4: <IoPhonePortraitOutline/>,
        icon5: <MdGroup/>,
        icon6: <PiBriefcaseThin/>,
        title: userSingle.full_name,
        title2: userSingle.role,
        title3: userSingle.email,
        title4: userProfile.phone,
        title5: 'Member of 7 teams',
        title6: 'Working on 8 projects',
    };
    const card4Props = {
        heading: 'Skills',
        lable1: 'About',
        lable2: 'Contacts',
        lable3: 'Teams',
        icon: <CiUser/>,
        icon2: <PiBriefcaseThin/>,
        icon3: <MdOutlineAlternateEmail/>,
        icon4: <IoPhonePortraitOutline/>,
        icon5: <MdGroup/>,
        icon6: <PiBriefcaseThin/>,
        title: userSingle.full_name,
        title2: userSingle.role,
        title3: userSingle.email,
        title4: userProfile.phone,
        title5: 'Member of 7 teams',
        title6: 'Working on 8 projects',
    };
    const card5Props = {
        heading: 'Work experience',
        lable1: 'About',
        lable2: 'Contacts',
        lable3: 'Teams',
        icon: <CiUser/>,
        icon2: <PiBriefcaseThin/>,
        icon3: <MdOutlineAlternateEmail/>,
        icon4: <IoPhonePortraitOutline/>,
        icon5: <MdGroup/>,
        icon6: <PiBriefcaseThin/>,
        title: userSingle.full_name,
        title2: userSingle.role,
        title3: userSingle.email,
        title4: userProfile.phone,
        title5: 'Member of 7 teams',
        title6: 'Working on 8 projects',
    };
    const card3Props = {
        heading: 'Education',
        icon: <FaUserGroup/>,
        icon2: <FaUserGroup/>,
        icon3: <FaUserGroup/>,
        icon4: <FaUserGroup/>,
        icon5: <FaUserGroup/>,
        title: '#digitalmarketing',
        title2: '#ethereum',
        title3: '#conference',
        title4: '#supportteam',
        title5: '#invoice',
        description: '8 members',
        description2: '14 members',
        description3: '3 members',
        description4: '3 members',
        description5: '3 members',
    };

    return (<MainDiv>
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

                        <h1 className="text-2xl font-semibold mt-4">{userSingle.full_name}
                            <i className="tio-verified text-primary ml-1" data-toggle="tooltip" data-placement="top"
                               title="Top endorsed"></i>
                        </h1>


                        <ul className="flex justify-center space-x-4 mt-2">

                            <li className="flex items-center">
                                <MdLocationCity className="tio-city mr-1"/>
                                <span>{userAddress?.city}</span>
                            </li>
                            <li className="flex items-center">
                                <CiLocationOn className="tio-poi-outlined mr-1"/>
                                <Link href="#"
                                      className="hover:text-blue-600 text-blue-600 ml-1">{userAddress?.state},{userAddress?.country}</Link>
                            </li>
                            <li className="flex items-center">
                                <BsCalendar4Week className="tio-date-range mr-1"/>
                                <span>Joined date : {userSingle.date_joined}</span>
                            </li>


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
                                <button
                                    className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-600'}`}
                                    onClick={() => handleTabChange('profile')}
                                >
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`px-4 py-2 ${activeTab === 'teams' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-600'}`}
                                    onClick={() => handleTabChange('teams')}
                                >
                                    Teams
                                </button>
                            </li>
                        </ul>
                    </div>
                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Profile/>
                            <Skills/>
                            <Education/>
                            <WorkExperience/>
                        </div>)}
                    {activeTab === 'teams' && <Teams/>}
                </div>
            </div>
        </div>
    </MainDiv>);
};

export default UserProfileDetail;


