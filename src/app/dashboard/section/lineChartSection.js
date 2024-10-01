import Card from "@/app/components/card/card";
import TotalUserChart from "@/app/components/chart/totaluserChart";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllTeamApi} from "@/app/api/getAllTeamApi";
import Link from "next/link";

const LineChartSection = () => {
    const dispatch = useDispatch();
    const {totalUsers} = useSelector((state) => state.auth);
    const {activeUsers} = useSelector((state) => state.auth);
    const {activeUserPtg} = useSelector((state) => state.auth);
    const {allTeams} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAllTeamApi());
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Users Card */}
            <div className="mb-3 lg:mb-5">
                <Card>
                    <Link href='../../pages/users'>
                        <h6 className="card-subtitle">Total Users</h6>
                        <div className="flex items-center justify-between">
                            <div className="w-1/2">
                                <h2 className="hover:text-blue-600">{totalUsers}</h2>
                            </div>
                            <div className="">
                                <div className="relative h-[6rem]">
                                    <TotalUserChart/>
                                </div>
                            </div>
                        </div>
                        <span className="badge bg-green-100 text-[#00c9a7]">
                                <i className="tio-trending-up"></i> 12.5%
                            </span>
                        <span className="text-gray-600 text-sm ml-1">from 70,104</span>
                    </Link>
                </Card>
            </div>

            {/* Sessions Card */}
            <div className="mb-3 lg:mb-5">
                <Card>
                    <h6 className="card-subtitle">Total Teams</h6>
                    <div className="flex items-center justify-between">
                        <div className="w-1/2">
                            <h2 className="hover:text-blue-600">{allTeams?.length}</h2>
                        </div>
                        <div className="">
                            <div className="relative h-[6rem]">
                                <TotalUserChart/>
                            </div>
                        </div>
                    </div>
                    <span className="badge bg-green-100 text-[#00c9a7]">
                                <i className="tio-trending-up"></i> 1.7%
                            </span>
                    <span className="text-gray-600 text-sm ml-1">from 29.1%</span>
                </Card>
            </div>

            {/* Avg. Click Rate Card */}
            <div className="mb-3 lg:mb-5">
                <Card>
                    <h6 className="card-subtitle">Active Users</h6>
                    <div className="flex items-center justify-between">
                        <div className="w-1/2">
                            <h2 className="hover:text-blue-600">{activeUsers}</h2>
                        </div>
                        <div className="">
                            <div className="relative h-[6rem]">
                                <TotalUserChart/>
                            </div>
                        </div>
                    </div>
                    <span className="badge bg-red-100 text-red-800">
                                <i className="tio-trending-down"></i> 4.4%
                            </span>
                    <span className="text-gray-600 text-sm ml-1">from 61.2%</span>
                </Card>
            </div>
            {/* Pageviews Card */}

        </div>

    )
};
export default LineChartSection