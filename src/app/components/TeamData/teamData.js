import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoEllipsisVerticalOutline, IoPersonRemove } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { getAllTeamApi } from "@/app/api/getAllTeamApi";
import dynamic from "next/dynamic";

const BASE_URL = 'http://127.0.0.1:8000';

// Dynamically import modal components
const AddMembersModal = dynamic(() => import("@/app/components/modal/addMembersModal"));
const EditTeamModal = dynamic(() => import("@/app/components/modal/editTeamModal"));
const DeleteMemberModal = dynamic(() => import("@/app/components/modal/deleteMemberModal"));

const TeamData = ({ data }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [isModalOpenAddMember, setIsModalOpenAddMember] = useState(false);
    const [isModalOpenEditTeam, setIsModalOpenEditTeam] = useState(false);
    const [isModalOpenDeleteMember, setIsModalOpenDeleteMember] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTeamApi());
    }, [dispatch]);

    const closeModalAddMember = useCallback(() => {
        setIsModalOpenAddMember(false);
    }, []);

    const openModalAddMember = useCallback((team) => {
        setSelectedTeam(team);
        setIsModalOpenAddMember(true);
        setOpenDropdownId(null);
    }, []);

    const closeModalEditTeam = useCallback(() => {
        setIsModalOpenEditTeam(false);
        setSelectedTeam(null);
    }, []);

    const openModalEditTeam = useCallback((team) => {
        setSelectedTeam(team);
        setIsModalOpenEditTeam(true);
        setOpenDropdownId(null);
    }, []);

    const closeModalDeleteMember = useCallback(() => {
        setIsModalOpenDeleteMember(false);
    }, []);

    const openModalDeleteMember = useCallback((teamId) => {
        setSelectedTeam(teamId);
        setIsModalOpenDeleteMember(true);
        setOpenDropdownId(null);
    }, []);

    const toggleDropdown = useCallback((id) => {
        setOpenDropdownId((prevId) => (prevId === id ? null : id));
    }, []);

    return (
        <>
            {data.map((item) => (
                <div key={item.id} className='bg-white shadow-custom mb-4 border-custom rounded-lg min-h-[20vh]'>
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h5 className='text-lg font-thin text-blue-600'>#{item.name}</h5>
                        <div className="relative" ref={dropdownRef}>
                            <button className="flex items-center" onClick={() => toggleDropdown(item.id)}>
                                <IoEllipsisVerticalOutline
                                    className='hover:text-blue-600 hover:bg-blue-200 rounded-full w-12 h-12 p-4'/>
                            </button>

                            {openDropdownId === item.id && (
                                <div className="absolute right-0 mt-4 pb-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-custom-shadow">
                                    <div className='pt-2'>
                                        <button
                                            className="flex items-center px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                            onClick={() => openModalEditTeam(item)}
                                        >
                                            <CiEdit className='mr-2'/> Edit Team
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                        <button
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                            onClick={()=> openModalAddMember(item)}
                                        >
                                            <MdOutlinePersonAdd className='mr-2'/> Add Members
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                        <button
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                            onClick={() => openModalDeleteMember(item.id)}
                                        >
                                            <IoPersonRemove className='mr-2'/> Delete Members
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <ul className="space-y-3 text-black mb-3 px-4 mt-2">
                        <li className="py-0">
                            <small className='text-sm text-gray-500'>{item.description}</small>
                        </li>
                        <div className="flex justify-between items-center pt-2">
                            <p>MEMBERS:</p>
                            <div className="flex px-2 py-1">
                                {Array.isArray(item.members) && item.members.slice(0, 5).map((member) => (
                                    <span key={member.id}
                                          className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                        <Image
                                            src={member.image ? `${BASE_URL}${member.image}` : '/default-avatar.jpg'}
                                            alt={`Member ${member.user}`}
                                            className="rounded-full"
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                ))}
                                {Array.isArray(item.members) && item.members.length > 5 && (
                                    <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                        +{item.members.length - 5}
                                    </span>
                                )}
                            </div>
                        </div>
                    </ul>
                </div>
            ))}
            <AddMembersModal isOpen={isModalOpenAddMember} onClose={closeModalAddMember} teamData={selectedTeam}/>
            <EditTeamModal isOpen={isModalOpenEditTeam} onClose={closeModalEditTeam} teamData={selectedTeam} />
            <DeleteMemberModal isOpen={isModalOpenDeleteMember} onClose={closeModalDeleteMember} teamId={selectedTeam} />
        </>
    );
};

export default TeamData;
