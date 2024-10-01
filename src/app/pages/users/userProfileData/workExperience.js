
import React, {useEffect, useState} from "react";
import {getUserExperience} from "@/app/api/getUserExperienceApi";
import {useDispatch, useSelector} from "react-redux";
import Content from "@/app/components/card/content";
import Card2 from "@/app/components/card/card2";
import {MdOutlineCreate, MdRotate90DegreesCw} from "react-icons/md";
import {BiSolidInstitution} from "react-icons/bi";
import Message from "@/app/components/message/message";
import {usePathname} from "next/navigation";
import AddWorkExperienceModal from "@/app/components/modal/addWorkExperienceModal";
import {FaTrash} from "react-icons/fa";


const WorkExperience = () => {
    const dispatch = useDispatch();
    const {userExperience,singleUser} = useSelector(state => state.auth)
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;
    useEffect(() => {
        if (id) {
            dispatch(getUserExperience(id));
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
        <Card2 heading="Work Experience" text="Add Work Experience" onclick={openModal}>
                     {userExperience && userExperience?.length > 0 ?
                         (<Content label="Company Name">
                        {userExperience.map(experience => (
                            <li key={experience.id}
                                className="flex items-center justify-between border-b border-inherit last-border-none">
                                <div>
                                    <div className="flex items-center">
                                        <MdRotate90DegreesCw className='mr-2 opacity-50'/>{experience.company_name}
                                    </div>
                                    <div className="text-gray-500 flex items-center">
                                        <BiSolidInstitution className='mr-2 opacity-50'/>
                                        <div className="relative group">{experience.title}
                                            <p className="hidden group-hover:block absolute top-[-30px] bg-white shadow-lg px-2 py-1 rounded-lg">Role</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {experience.joining_date} - {experience.end_date}
                                    <div className="text-gray-500">{experience.remarks}</div>
                                    <div className="flex h-8 justify-end mb-2">
                                        <button
                                            className=" flex mr-2 items-center px-2 bg-white hover:text-blue-600 hover:border-blue-600 border border-gray-300 rounded text-gray-700 flex items-center"
                                        >
                                            <MdOutlineCreate/>
                                        </button>
                                        <button
                                            className=" flex items-center px-2 bg-white hover:text-blue-600 hover:border-blue-600 border border-gray-300 rounded text-gray-700 flex items-center"
                                        >
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </div>

                            </li>
                        ))}
                         </Content>) : (
                             <Message>No Experience data available</Message>
                         )}
        </Card2>
            <AddWorkExperienceModal isOpen={isModalOpen} onClose={closeModal}/>
        </>

    )
};
export default WorkExperience;