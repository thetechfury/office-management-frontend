'use client'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {getUser} from '@/slices/authSlice';
import MainDiv from "@/app/components/mainDiv/mainDiv";
import dynamic from "next/dynamic";
import SalesTopCategories from "@/app/pages/inventory/sections/salesTopCategories";
import Link from "next/link";
import Image from "next/image";
import Shoes from "@/app/assets/images/img6.jpg";
import {FaTrash} from "react-icons/fa";
import TableCard from "@/app/components/card/tableCard";
const LineChartSection = dynamic(() => import("@/app/dashboard/section/lineChartSection"),{ ssr: false });
const UserSection = dynamic(() => import("@/app/dashboard/section/userSection"),{ ssr: false });

const Dashboard = () => {

    const {user, users, singleUser, loading, error} = useSelector(state => state.auth);
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
                <LineChartSection/>
                <SalesTopCategories/>
                <TableCard>
                    <div className="pb-4 px-4">
                        <h5>Leaves</h5>
                    </div>
                    <div className="overflow-x-auto max-h-[55vh]">
                        <table
                            className="table-auto border-collapse w-full"
                        >
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="pl-8 py-2">Date</th>
                                <th className="py-2">Total Employees</th>
                                <th className="py-2">First Half</th>
                                <th className="py-2">Second Half</th>
                                <th className="py-2">Working From Home</th>
                                <th className="py-2">Absent</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className='border-b'>
                                <td className="px-8 py-2">30 Aug 2024</td>
                                <td className="py-2">7</td>
                                <td>6</td>
                                <td className="py-2">7</td>
                                <td className="py-2">1</td>
                                <td>0</td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-8 py-2">28 Aug 2024</td>
                                <td className="py-2">2</td>
                                <td>5</td>
                                <td className="py-2">4</td>
                                <td className="py-2">0</td>
                                <td>2</td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-8 py-2">25 Aug 2024</td>
                                <td className="py-2">2</td>
                                <td>1</td>
                                <td className="py-2">4</td>
                                <td className="py-2">0</td>
                                <td>1</td>
                            </tr>
                            <tr className=''>
                                <td className="px-8 py-2">20 Aug 2024</td>
                                <td className="py-2">3</td>
                                <td>6</td>
                                <td className="py-2">2</td>
                                <td className="py-2">3</td>
                                <td>2</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </TableCard>
                <TableCard>
                    <div className="pb-4 px-4">
                        <h5>Leaves</h5>
                    </div>
                    <div className="overflow-x-auto max-h-[55vh]">
                        <table
                            className="table-auto border-collapse w-full"
                        >
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="pl-8 py-2">Team Member</th>
                                <th className="py-2">Leave type</th>
                                <th className="py-2">From</th>
                                <th className="py-2">To</th>
                                <th className="py-2">Remaining Days</th>
                                <th className="py-2">Status</th>
                                <th className="py-2 pl-12">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className='border-b'>
                                <td className="pl-8 py-2">
                                    <Link className="flex items-center" href="/">
                                        <div className="w-8 h-8 rounded-full mr-2">
                                            <Image
                                                className="w-full h-full rounded-full"
                                                src={Shoes}
                                                alt="Image Description"
                                            />
                                        </div>
                                        <div className="media-body">
                                          <span className="text-primary mb-0">
                                            Adnan
                                          </span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2">Parental Leave</td>
                                <td>05 Dec 2023</td>
                                <td className="py-2">07 Dec 2023</td>
                                <td className="py-2">3</td>
                                <td className="py-2">Approved</td>
                                <td className="pl-12 w-52">
                                    <button
                                        className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                    >
                                        <FaTrash className="mr-2"/> Delete
                                    </button>
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="pl-8 py-2">
                                    <Link className="flex items-center" href="/">
                                        <div className="w-8 h-8 rounded-full mr-2">
                                            <Image
                                                className="w-full h-full rounded-full"
                                                src={Shoes}
                                                alt="Image Description"
                                            />
                                        </div>
                                        <div className="media-body">
                                          <span className="text-primary mb-0">
                                            Zeeshan
                                          </span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2">Parental Leave</td>
                                <td>15 Dec 2023</td>
                                <td className="py-2">17 Dec 2023</td>
                                <td className="py-2">2</td>
                                <td className="py-2">Approved</td>
                                <td className="pl-12">
                                    <button
                                        className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                    >
                                        <FaTrash className="mr-2"/> Delete
                                    </button>
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="pl-8 py-2">
                                    <Link className="flex items-center" href="/">
                                        <div className="w-8 h-8 rounded-full mr-2">
                                            <Image
                                                className="w-full h-full rounded-full"
                                                src={Shoes}
                                                alt="Image Description"
                                            />
                                        </div>
                                        <div className="media-body">
                                          <span className="text-primary mb-0">
                                            Junaid
                                          </span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2">Parental Leave</td>
                                <td>25 Dec 2023</td>
                                <td className="py-2">28 Dec 2023</td>
                                <td className="py-2">3</td>
                                <td className="py-2">Reject</td>
                                <td className="pl-12">
                                    <button
                                        className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                    >
                                        <FaTrash className="mr-2"/> Delete
                                    </button>
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="pl-8 py-2">
                                    <Link className="flex items-center" href="/">
                                        <div className="w-8 h-8 rounded-full mr-2">
                                            <Image
                                                className="w-full h-full rounded-full"
                                                src={Shoes}
                                                alt="Image Description"
                                            />
                                        </div>
                                        <div className="media-body">
                                          <span className="text-primary mb-0">
                                            Usama
                                          </span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2">Annual Leave</td>
                                <td>1 Dec 2023</td>
                                <td className="py-2">07 Dec 2023</td>
                                <td className="py-2">6</td>
                                <td className="py-2">Approved</td>
                                <td className="pl-12">
                                    <button
                                        className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                    >
                                        <FaTrash className="mr-2"/> Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="pl-8 py-2">
                                    <Link className="flex items-center" href="/">
                                        <div className="w-8 h-8 rounded-full mr-2">
                                            <Image
                                                className="w-full h-full rounded-full"
                                                src={Shoes}
                                                alt="Image Description"
                                            />
                                        </div>
                                        <div className="media-body">
                                          <span className="text-primary mb-0">
                                            Ali
                                          </span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2">Sick Leave</td>
                                <td>13 Dec 2023</td>
                                <td className="py-2">17 Dec 2023</td>
                                <td className="py-2">4</td>
                                <td className="py-2">Reject</td>
                                <td className="pl-12">
                                    <button
                                        className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                    >
                                        <FaTrash className="mr-2"/> Delete
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </TableCard>

            </div>

            {/*<BarChartSection/>*/}
            {/*{isEndUser && <UserSection/>}*/}

        </MainDiv>
    );
}
export default Dashboard;