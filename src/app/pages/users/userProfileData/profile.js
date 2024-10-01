import Content from "@/app/components/card/content";
import { CiUser } from "react-icons/ci";
import { PiBriefcaseThin } from "react-icons/pi";
import { MdGroup, MdOutlineAlternateEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Card2 from "@/app/components/card/card2";
import React, { useCallback, useEffect, useState } from "react";
import { getUserProfile } from "@/app/api/getUserProfileApi";
import { getUserAddressApi } from "@/app/api/getUserAddressApi";
import { getSingleUserApi } from "@/app/api/getSingleUserApi";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const EditProfileModal = dynamic(() => import("@/app/components/modal/editProfileModal"), { ssr: false });

const Profile = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.userProfile);
    const { userSingle, singleUser } = useSelector(state => state.auth);
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const closeEditProfileModal = () => setIsEditProfileModalOpen(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

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

    const openModalEditTeam = useCallback((userSingle) => {
        setSelectedProfile(userSingle);
        setIsEditProfileModalOpen(true);
    }, []);

    return (
        <div>
            <Card2 heading='profile' text="Edit Profile" onclick={() => openModalEditTeam(userSingle)}>
                <Content label='About'>
                    <li className="flex items-center">
                        <CiUser className='mr-2 opacity-50' />
                        <div className="relative group">{userSingle?.full_name}
                            <p className="hidden group-hover:block absolute top-[-24px] bg-white shadow-lg p-2 rounded-lg">Name</p>
                        </div>
                    </li>
                    <li className="flex items-center ">
                        <PiBriefcaseThin className='mr-2 opacity-50' />
                        <div className="relative group">{userSingle?.role}
                            <p className="hidden group-hover:block absolute top-[-24px] bg-white shadow-lg p-2 rounded-lg">Role</p>
                        </div>
                    </li>
                </Content>
                <Content label='Contact'>
                    <li className="flex items-center ">
                        <MdOutlineAlternateEmail className='mr-2 opacity-50' />
                        <div className="relative group">{userSingle?.email}
                            <p className="hidden group-hover:block absolute top-[-24px] bg-white shadow-lg p-2 rounded-lg">Email</p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <IoPhonePortraitOutline className='mr-2 opacity-50' />
                        <div className="relative group">{userProfile?.phone}
                            <p className="hidden group-hover:block absolute top-[-24px] bg-white shadow-lg p-2 rounded-lg">Phone</p>
                        </div>
                    </li>
                </Content>
                <Content label='Teams'>
                    <li className="flex items-center">
                        <MdGroup className='mr-2 opacity-50' />
                        Member of 7 teams
                    </li>
                    <li className="flex items-center">
                        <PiBriefcaseThin className='mr-2 opacity-50' />
                        Working on 8 projects
                    </li>
                </Content>
            </Card2>
            <EditProfileModal isOpen={isEditProfileModalOpen} onClose={closeEditProfileModal} profileData={selectedProfile} />
        </div>
    );
};

export default Profile;
