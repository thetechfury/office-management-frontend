'use client';
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import user from '@/app/assets/images/img9.jpg'
import user1 from '@/app/assets/images/img6.jpg'
import Card2 from "@/app/components/card/card2";
import Content from "@/app/components/card/content";
import {useDispatch, useSelector} from "react-redux";
import {usePathname} from "next/navigation";
import {getUserTeamApi} from "@/app/api/getUserTeamApi";

const Teams = () => {
    const dispatch = useDispatch();
    const {userTeam,singleUser} = useSelector(state => state.auth)
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;

    useEffect(()=>{
        if(id){
            dispatch(getUserTeamApi(id))
        }
    },[id])


    return (
        <div className="mb-8">
            <div className="pb-6 pt-4"><h3>{userTeam?.number_of_user_teams} teams</h3></div>
            <div className="grid grid-cols-3 gap-4">
                 {userTeam?.user_teams?.map((team) => (
                    <Card2 key={team.id} heading={`#${team.name}`} className="text-blue-600 text-lg font-thin" className1="!min-h-[20vh]">
                        <Content className="text-sm" label={team.description}>
                            <div className="flex justify-between items-center pt-2">
                                <p>MEMBERS:</p>
                                <div className="flex px-2 py-1">
                                    {team.members.slice(0, 5).map((member, index) => (
                                        <span key={member.id} className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                            <Image
                                                src={member.image ? `${member.image}` : '/default-avatar.jpg'} // Add a default avatar if image is null
                                                alt={`Member ${member.user}`}
                                                className="rounded-full"
                                                width={24}
                                                height={24}
                                            />
                                        </span>
                                    ))}
                                    {team.members.length > 5 && (
                                        <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                            +{team.members.length - 5}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Content>
                    </Card2>
                ))}
            </div>
        </div>
    )
};
export default Teams;