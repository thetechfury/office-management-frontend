'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {getAllTeamApi} from "@/app/api/getAllTeamApi";
import MainDiv from "@/app/components/mainDiv/mainDiv";
import TeamData from "@/app/components/TeamData/teamData";
import AddMembersModal from "@/app/components/modal/addMembersModal";

const Teams = () => {
    const dispatch = useDispatch();
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const {allTeams} = useSelector(state => state.auth);
    // const [selectedTeamId, setSelectedTeamId] = useState(null);

    useEffect(() => {
        dispatch(getAllTeamApi());
    }, [dispatch]);
 // const addMember = (teamId) => {
 //       setSelectedTeamId(teamId);
 //      setIsModalOpen(true);
 //        console.log(`Add member to team`);
 //    };
 // const closeModal = () => {
 //        setIsModalOpen(false);
 //    };

    const removeMember = (teamId) => {
        // Remove member API call logic here
        console.log(`Remove member from team ${teamId}`);
    };
    return (
        <MainDiv>
            <div className="flex justify-center">
                <div className="lg:w-10/12">
                    <div className="bg-profile-image bg-cover top-0 left-0 right-0 h-[10rem] rounded-lg"></div>
                    <div className="mb-8 px-8">
                        <div className="pb-6 pt-4">
                            <h3>{allTeams?.length} teams</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <TeamData data={allTeams}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<AddMembersModal isOpen={isModalOpen} onClose={closeModal} selectedTeamId={selectedTeamId} />*/}
        </MainDiv>
);
};

export default Teams;
