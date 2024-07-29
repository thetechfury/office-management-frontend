import Card2 from "@/app/components/card/card2";
import {useEffect} from "react";
import {getUserEducation} from "@/app/api/getUserEducationApi";
import {useDispatch, useSelector} from "react-redux";
import Content from "@/app/components/card/content";
import {BiSolidInstitution} from "react-icons/bi";
import {MdRotate90DegreesCw} from "react-icons/md";
import Message from "@/app/components/message/message";
import {usePathname} from "next/navigation";

const Education = () => {
    const dispatch = useDispatch();
    const {userEducation,singleUser} = useSelector(state => state.auth)
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;
    useEffect(() => {
        if (id) {
            dispatch(getUserEducation(id));
        }
    }, [id, dispatch]);
    return (
        <Card2 heading='Education'>
            {userEducation && userEducation?.length > 0 ? (
                <Content label='Degree'>
                    {userEducation.map(education => (
                        <li key={education.id} className="flex items-center justify-between border-b border-inherit last-border-none">
                            <div>
                                <div className="flex items-center ">
                                    <MdRotate90DegreesCw className='mr-2 opacity-50'/>
                                    {education.degree}
                                </div>
                                <div className="text-gray-500 flex items-center">
                                    <BiSolidInstitution className='mr-2 opacity-50'/>
                                    <div className="relative group">{education.institute}
                                        <p className="hidden group-hover:block absolute top-[-30px] bg-white shadow-lg px-2 py-1 rounded-lg">Institute</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {education.start_date} - {education.end_date}
                                <div className="text-gray-500">{education.obtain_marks} / {education.total_marks}</div>
                            </div>
                        </li>
                    ))}
                </Content>) : (
                <Message>No education data available</Message>)}
        </Card2>
    )
};
export default Education;