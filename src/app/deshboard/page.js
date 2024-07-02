'use client'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {FaUserPlus} from "react-icons/fa";
import {Chart} from 'chart.js/auto';
import {getUser} from "@/app/slices/authSlice";
import LineChartSection from "@/app/deshboard/section/lineChartSection";
import BarChartSection from "@/app/deshboard/section/barChartSection";
import UserSection from "@/app/deshboard/section/userSection";


export default function Deshboard() {
    const {user} = useSelector(state => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                router.push('../signin'); // Redirect to dashboard if already logged in
            }, 100);

        }
    }, [user, router]);
    //
    // useEffect(() => {
    //
    //     dispatch(getUser());
    //
    // }, [dispatch]);


    return (
        <main className="pl-0 sm:pl-[16rem] pt-[4.75rem] sm:pt-[4.75rem]">
            <div className="content mx-auto px-4 sm:px-6 lg:px-8">
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
            <UserSection/>
        </main>
    )
}


