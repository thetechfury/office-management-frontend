import Card2 from "@/app/components/card/card2";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Content from "@/app/components/card/content";
import {getUserSkill} from "@/app/api/getUserSkillsApi";
import {FaConnectdevelop} from "react-icons/fa";
import {GiLevelEndFlag} from "react-icons/gi";
import Message from "@/app/components/message/message";
import {usePathname} from "next/navigation";
import AddSkillsModal from "@/app/components/modal/addSkillsModal";

const Skills = () => {
    const dispatch = useDispatch();
    const {userSkill, singleUser} = useSelector(state => state.auth)
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                            </li>
                        ))}
                    </Content>) : (
                    <Message>No Skills data available</Message>)}
            </Card2>
            <AddSkillsModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
};
export default Skills;