import Card2 from "@/app/components/card/card2";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Content from "@/app/components/card/content";
import {getUserSkill} from "@/app/api/getUserSkillsApi";
import {FaConnectdevelop, FaTrash} from "react-icons/fa";
import {GiLevelEndFlag} from "react-icons/gi";
import Message from "@/app/components/message/message";
import {usePathname} from "next/navigation";
import {MdOutlineCreate} from "react-icons/md";
import dynamic from "next/dynamic";

const AddSkillsModal = dynamic(() => import("@/app/components/modal/addSkillsModal"), {ssr: false});
const EditSkillsModal = dynamic(() => import("@/app/components/modal/editSkillsModal"), {ssr: false});
const Skills = () => {
    const dispatch = useDispatch();
    const {userSkill, singleUser} = useSelector(state => state.auth)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectSkill, setSelectSkill] = useState(null)
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;
    useEffect(() => {
        if (id) {
            dispatch(getUserSkill(id));
        }
    }, [id, dispatch]);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeEditModal = () => {
        setOpenEditModal(false);
    };
    const openEditSkillModal = useCallback((skill) => {
        setSelectSkill(skill);
        setOpenEditModal(true);

    }, []);
    return (
        <>
            <Card2 heading='Skills' text="Add Skills" onclick={openModal}>
                {userSkill && userSkill?.length > 0 ? (
                    <Content label='Skill'>
                        {userSkill.map(skill => (
                            <li key={skill.id}
                                className="flex justify-between border-b border-inherit last-border-none">
                                <div className='w-full'>
                                    <div className="flex items-center relative group">
                                        <FaConnectdevelop className='mr-2 opacity-50'/>{skill.name}
                                    </div>
                                    <div className="text-gray-500 flex items-center mt-2">
                                        <GiLevelEndFlag className='mr-2 opacity-50'/>{skill.level}
                                    </div>
                                </div>
                                <div className='w-84'>
                                    <div className="text-gray-500">{skill.description} </div>
                                </div>
                                <div className="flex h-8">
                                    <button
                                        className=" flex items-center px-2 bg-white hover:text-blue-600 hover:border-blue-600 border border-gray-300 rounded text-gray-700 flex items-center"
                                        onClick={() => openEditSkillModal(skill)}>
                                        <MdOutlineCreate/>
                                    </button>
                                </div>

                            </li>
                        ))}
                    </Content>) : (
                    <Message>No Skills data available</Message>)}
            </Card2>
            <AddSkillsModal isOpen={isModalOpen} onClose={closeModal}/>
            <EditSkillsModal isOpen={openEditModal} onClose={closeEditModal} skillData={selectSkill}/>
        </>
    )
};
export default Skills;