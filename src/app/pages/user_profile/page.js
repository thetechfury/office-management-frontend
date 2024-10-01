'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/app/api/getUserProfileApi';
import dynamic from 'next/dynamic';
import MainDiv from '@/app/components/mainDiv/mainDiv';
import Image from 'next/image';
import Link from 'next/link';
import { CiLocationOn } from 'react-icons/ci';
import { MdLocationCity, MdOutlineCreate } from 'react-icons/md';
import { BsCalendar4Week } from 'react-icons/bs';
import { getUserAddressApi } from '@/app/api/getUserAddressApi';
import { useRouter } from 'next/navigation';

const Teams = dynamic(() => import('@/app/pages/user-teams/page'), { ssr: false });
const Profile = dynamic(() => import('@/app/pages/users/userProfileData/profile'), { ssr: false });
const Skills = dynamic(() => import('@/app/pages/users/userProfileData/skills'), { ssr: false });
const Education = dynamic(() => import('@/app/pages/users/userProfileData/education'), { ssr: false });
const WorkExperience = dynamic(() => import('@/app/pages/users/userProfileData/workExperience'), { ssr: false });
const CreateTeamModal = dynamic(() => import('@/app/components/modal/createTeamModal'), { ssr: false });
const AddImageModal = dynamic(() => import('@/app/components/modal/addImageModal'), { ssr: false });

const BASE_URL = 'http://127.0.0.1:8000';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, singleUser, userAddress } = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const router = useRouter();
    const id = singleUser?.id;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const handleTabChange = (tab) => setActiveTab(tab);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openImageModal = () => setIsImageModalOpen(true);
    const closeImageModal = () => setIsImageModalOpen(false);



    useEffect(() => {
        if (!user) {
            router.push('../../signin');
        }
    }, [user, router]);

    useEffect(() => {
        if (id) {
            dispatch(getUserProfile(id));
            dispatch(getUserAddressApi(id));
        }
    }, [id, dispatch]);
    return (
        <MainDiv>
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="lg:w-10/12">
                        <div className="bg-profile-image bg-cover top-0 left-0 right-0 h-[10rem] rounded-lg"></div>
                        <div className="text-center mb-5">
                            <div className="relative inline-block w-32 h-32 rounded-full border-4 border-white bg-white mt-[-6.3rem]">
                                <Image
                                    className="w-full h-full rounded-full object-cover"
                                    src={singleUser.image ? `${BASE_URL}${singleUser.image}` : '/default-avatar.jpg'}
                                    width={128}
                                    height={128}
                                    alt="User Avatar"
                                />
                                <button className="absolute bottom-0 right-0 w-4 h-4 border-2 border-inherite" onClick={openImageModal}>
                                    <MdOutlineCreate className="mr-2"/>
                                </button>
                            </div>
                            <h1 className="mt-4">{singleUser?.full_name}</h1>
                            <ul className="flex justify-center space-x-4 mt-2">
                                <li className="flex items-center">
                                    <MdLocationCity className="mr-1"/>
                                    <span>{userAddress.city}</span>
                                </li>
                                <li className="flex items-center">
                                    <CiLocationOn className="mr-1"/>
                                    <Link href="#" className="hover:text-blue-600 text-blue-600 ml-1">
                                        {userAddress.state}, {userAddress.country}
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <BsCalendar4Week className="mr-1"/>
                                    <span>Joined : {singleUser?.date_joined}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="relative mb-5">
                            <ul className="flex space-x-4 justify-between border-b border-gray-200">
                                <div className='flex'>
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
                                </li></div>
                                {activeTab === 'user-teams' && (
                                    <li className="ml-auto flex items-center space-x-2 pb-2">
                                        <button
                                            className="px-4 py-2 bg-white hover:text-blue-600 border border-gray-300 rounded text-gray-700 flex items-center"
                                            onClick={openModal}
                                        >
                                            <MdOutlineCreate className="mr-2"/> Create Team
                                        </button>
                                    </li>
                                )}
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
            </div>
            <CreateTeamModal isOpen={isModalOpen} onClose={closeModal} />
            <AddImageModal isOpen={isImageModalOpen} onClose={closeImageModal}/>
        </MainDiv>
    );
};

export default UserProfile;
