import Card2 from "@/app/components/card/card2";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Content from "@/app/components/card/content";
import {getUserSkill} from "@/app/api/getUserSkillsApi";
import {FaConnectdevelop} from "react-icons/fa";
import {GiLevelEndFlag} from "react-icons/gi";
import Message from "@/app/components/message/message";
import {usePathname} from "next/navigation";

const Skills = () => {
    const dispatch = useDispatch();
    const {userSkill,singleUser} = useSelector(state => state.auth)
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;
    useEffect(() => {
        if (id) {
            dispatch(getUserSkill(id));
        }
    }, [id, dispatch]);
    return (
        <Card2 heading='Skills'>
            {userSkill && userSkill.length > 0 ? (
                <Content label='Skill' >
                    {userSkill.map(skill => (
                        <li key={skill.id} className="flex justify-between border-b border-inherit last-border-none">
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
                <Message>No education data available</Message>)}
        </Card2>
    )
};
export default Skills;