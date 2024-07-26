'use client'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {FaUserPlus} from "react-icons/fa";
import {Chart} from 'chart.js/auto';
import {getUser} from "@/app/slices/authSlice";
import MainDiv from "@/app/components/mainDiv/mainDiv";
import LineChartSection from "@/app/dashboard/section/lineChartSection";
import BarChartSection from "@/app/dashboard/section/barChartSection";
import UserSection from "@/app/dashboard/section/userSection";

export default function Dashboard({userId}) {
    const {user, users, singleUser,loading,error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isEndUser, setIsEndUser] = useState(false);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
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
                router.push('../signin'); // Redirect to signin if not logged in
        }
    }, [user, router]);

    useEffect(() => {
        import('../pages/users/page')
        import('../pages/user_profile/page')
    }, []);
    return (
        <MainDiv>
            <div className="content mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b-[1px] border-inherit pb-7 mb-7">
                    <div className="flex items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
            <LineChartSection/>
            {/*<BarChartSection/>*/}
            {isEndUser && <UserSection/>}

        </MainDiv>
    );
}
