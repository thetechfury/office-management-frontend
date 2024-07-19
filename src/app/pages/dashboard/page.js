'use client'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {FaUserPlus} from "react-icons/fa";
import {Chart} from 'chart.js/auto';
import {getUser} from "@/app/slices/authSlice";
import MainDiv from "@/app/components/mainDiv/mainDiv";
import LineChartSection from "@/app/pages/dashboard/section/lineChartSection";
import BarChartSection from "@/app/pages/dashboard/section/barChartSection";
import UserSection from "@/app/pages/dashboard/section/userSection";

export default function Dashboard({userId}) {
    const {user, users, singleUser,loading,error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isEndUser, setIsEndUser] = useState(false);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
//     useEffect(() => {
//     console.log("Redux State:", { user, users, singleUser, loading, error });
// }, [current_user, users, singleUser, loading, error]);
   useEffect(() => {
    if (singleUser) {
        const isEndUser = singleUser.role === "admin";
        setIsEndUser(isEndUser);
        console.log("Is there an enduser?", isEndUser);
    } else {
        console.log("Single user is empty or undefined");
    }
}, [singleUser]);

    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                router.push('../signin'); // Redirect to signin if not logged in
            }, 100);
        }
    }, [user, router]);

    return (
        <MainDiv>
            <div className="content mx-auto px-4 sm:px-6 lg:px-8">
                {singleUser && (
                    <div className="user-details">
                        <h2>User Details</h2>
                        <p><strong>Full Name:</strong> {singleUser.full_name}</p>
                        <p><strong>Email:</strong> {singleUser.email}</p>
                        <p><strong>Role:</strong> {singleUser.role}</p>
                        <p><strong>Date Joined:</strong> {singleUser.date_joined}</p>
                        {/* Add more fields as needed */}
                    </div>
                )}
                {/* Page Header */}
                <div className="page-header py-4 border-b-[1px] border-inherit pb-7 mb-7">
                    <div className="flex items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                            <h1>Dashboard</h1>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary bg-blue-500 flex gap-4 leading-4 text-white py-4 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                <FaUserPlus/> Invite users
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <LineChartSection/>
            <BarChartSection/>
            {isEndUser && <UserSection/>}

        </MainDiv>
    );
}
