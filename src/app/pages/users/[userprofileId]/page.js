'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/app/api/getUserProfileApi';
import dynamic from 'next/dynamic';
import MainDiv from '@/app/components/mainDiv/mainDiv';
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { MdLocationCity, MdOutlineCreate } from "react-icons/md";
import { BsCalendar4Week } from "react-icons/bs";
import { getUserAddressApi } from '@/app/api/getUserAddressApi';
import { getSingleUserApi } from '@/app/api/getSingleUserApi';
import { usePathname, useRouter } from "next/navigation";
import { getUserEducation } from "@/app/api/getUserEducationApi";
import { getUserExperience } from "@/app/api/getUserExperienceApi";
import Swal from "sweetalert2";
import { addProfileImageApi } from "@/app/api/addProfileImageApi";

// Dynamically import components
const Profile = dynamic(() => import("@/app/pages/users/userProfileData/profile"),{ ssr: false });
const Skills = dynamic(() => import("@/app/pages/users/userProfileData/skills"),{ ssr: false });
const Education = dynamic(() => import("@/app/pages/users/userProfileData/education"),{ ssr: false });
const WorkExperience = dynamic(() => import("@/app/pages/users/userProfileData/workExperience"),{ ssr: false });
const Teams = dynamic(() => import("@/app/pages/user-teams/page"),{ ssr: false });
const AddImageModal = dynamic(() => import("@/app/components/modal/addImageModal"),{ ssr: false });

const BASE_URL = 'http://127.0.0.1:8000';

const UserProfileDetail = () => {
    const dispatch = useDispatch();
    const { userAddress, user, singleUser,userSingle,userProfile } = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const router = useRouter();
    const userIdFromStorage = localStorage.getItem('userId');
    const currentPage = usePathname();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const id = currentPage === '/pages/user_profile' ? singleUser?.id : userIdFromStorage;

    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                router.push('../../../signin');
            }, 100);
        }
    }, [user, router]);

    useEffect(() => {
        if (id) {
            dispatch(getUserProfile(id));
            dispatch(getUserAddressApi(id));
            dispatch(getSingleUserApi(id));
            dispatch(getUserEducation(id));
            dispatch(getUserExperience(id));
        }
    }, [id, dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const openImageModal = () => {
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };

    const handleImageUpload = async (formData) => {
        try {
            const response = await dispatch(addProfileImageApi(formData));
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Image uploaded successfully.',
                    icon: 'success',
                });
                closeImageModal();
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to upload the image.',
                icon: 'error',
            });
            closeImageModal();
        }
    };

    return (
        <MainDiv>
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="lg:w-10/12">
                        <div className="bg-profile-image bg-cover top-0 left-0 right-0 h-[10rem] rounded-lg"></div>
                        <div className="text-center mb-5">
                            <div className="relative inline-block w-32 h-32 rounded-full border-4 border-white bg-white mt-[-6.3rem]">
                                <Image className="w-full h-full rounded-full object-cover"
                                    src={userProfile?.image ? `${BASE_URL}${userProfile.image}` : '/default-avatar.jpg'}
                                    width={100}
                                    height={100}
                                    alt="Image Description"
                                />
                                <button
                                    className="absolute bottom-0 right-0 w-4 h-4 border-2 border-inherite"
                                    onClick={openImageModal}><MdOutlineCreate className="mr-2" />
                                </button>
                            </div>
                            <h1 className="text-2xl font-semibold mt-4">
                                {userSingle?.full_name}
                                <i className="tio-verified text-primary ml-1" title="Top endorsed"></i>
                            </h1>
                            <ul className="flex justify-center space-x-4 mt-2">
                                <li className="flex items-center">
                                    <MdLocationCity className="tio-city mr-1" />
                                    <span>{userAddress?.city}</span>
                                </li>
                                <li className="flex items-center">
                                    <CiLocationOn className="tio-poi-outlined mr-1" />
                                    <Link href="#" className="hover:text-blue-600 text-blue-600 ml-1">
                                        {userAddress?.state}, {userAddress?.country}
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <BsCalendar4Week className="tio-date-range mr-1" />
                                    <span>Joined date: {singleUser?.date_joined}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative mb-5">
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
                                        className={`px-4 py-2 ${activeTab === 'user-teams' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-600'}`}
                                        onClick={() => handleTabChange('user-teams')}
                                    >
                                        Teams
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-2 gap-4">
                                <Profile />
                                <Skills />
                                <Education />
                                <WorkExperience />
                            </div>
                        )}
                        {activeTab === 'user-teams' && <Teams />}
                    </div>
                </div>
                <AddImageModal isOpen={isImageModalOpen} onClose={closeImageModal} onImageUpload={handleImageUpload} />
            </div>
        </MainDiv>
    );
};

export default UserProfileDetail;
