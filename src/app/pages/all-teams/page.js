'use client';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeamApi } from "@/app/api/getAllTeamApi";
import dynamic from "next/dynamic";
import MainDiv from "@/app/components/mainDiv/mainDiv";

// Dynamically import TeamData component
const TeamData = dynamic(() => import("@/app/components/TeamData/teamData"));

const Teams = () => {
    const dispatch = useDispatch();
    const { allTeams } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAllTeamApi());
    }, [dispatch]);

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
                            {allTeams && <TeamData data={allTeams} />}
                        </div>
                    </div>
                </div>
            </div>
        </MainDiv>
    );
};

export default Teams;
