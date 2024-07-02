import {FaRegBell, FaSearch} from 'react-icons/fa';
import {BiGridAlt} from 'react-icons/bi';
import {HiArrowTrendingUp} from 'react-icons/hi';
import {useEffect, useState} from "react";
import Image from "next/image";
import userImg from "@/app/assets/images/img6.jpg"
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "@/app/slices/authSlice";

const UserSection = () => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectSignUp, setSelectSignUp] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    // function getCookieValue(cookieName) {
    //     console.log('cookie:', document.cookie)
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.startsWith(cookieName + '=')) {
    //             return cookie.split('=')[1];
    //         }
    //     }
    //     return null;
    // }
    //
    // const csrftoken = getCookieValue('csrftoken');
    // const sessionid = getCookieValue('sessionid');
    //
    // console.log('csrftoken:', csrftoken);
    // console.log('sessionid:', sessionid);
    // useEffect(() => {
    //
    //     dispatch(getUser());
    // }, [dispatch]);

    const users = [
        {
            id: 1,
            fullName: 'Amanda Harvey',
            status: 'Successful',
            type: 'Unassigned',
            email: 'amanda@example.com',
            signedUp: '1 year ago',
            userId: '67989'
        },
        {
            id: 2,
            fullName: 'Anne Richard',
            status: 'Successful',
            type: 'Subscription',
            email: 'anne@example.com',
            signedUp: '6 months ago',
            userId: '67326'
        },
        {
            id: 3,
            fullName: 'David Harrison',
            status: 'Overdue',
            type: 'Non-subscription',
            email: 'david@example.com',
            signedUp: '6 months ago',
            userId: '55821'
        },
        {
            id: 4,
            fullName: 'Salman Harrison',
            status: 'Pending',
            type: 'Non-subscription',
            email: 'salman@example.com',
            signedUp: '1 Year ago',
            userId: '55824'
        },
        {
            id: 5,
            fullName: 'Junaid Harrison',
            status: 'Pending',
            type: 'Non-subscription',
            email: 'junaid@example.com',
            signedUp: '6 months ago',
            userId: '55825'
        }
    ];
    const filteredUsers = users.filter((user) => {
        const statusMatch = selectedStatus
            ? user.status.toLowerCase() === selectedStatus.toLowerCase()
            : true;
        const signUpMatch = selectSignUp
            ? user.signedUp.toLowerCase() === selectSignUp.toLowerCase()
            : true;
        const searchMatch = searchTerm
            ? Object.values(user)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : true;

        return statusMatch && signUpMatch && searchMatch;
    });

    return (
        <div className="px-4 sm:px-6 lg:px-8 pb-4">
            <div className="card shadow-md hover:shadow-lg h-full border border-inherit rounded-xl py-4">
                {/* Header */}
                <div className="pb-4 px-4">
                    <div className="flex flex-wrap justify-between items-center flex-grow-1">
                        <div className="w-full md:w-auto">
                            <div className="flex justify-between items-center">
                                <h5>Users</h5>
                                {/* Datatable Info */}
                                <div id="datatableCounterInfo" className="hidden">
                                    <div className="flex items-center">
                                        <span className="text-sm mr-3">
                                          <span id="datatableCounter">0</span>
                                          Selected
                                        </span>
                                        <a className="btn btn-sm btn-outline-danger" href="#">
                                            <i className="tio-delete-outlined"/> Delete
                                        </a>
                                    </div>
                                </div>
                                {/* End Datatable Info */}
                            </div>
                        </div>
                        <div className="w-auto">
                            {/* Filter */}
                            <div className="flex flex-wrap items-center">
                                <div className="w-auto">
                                    <div className="flex items-center mr-2">
                                        <span className="text-secondary mr-2">Status:</span>
                                        {/* Select */}
                                        <select
                                            className=""
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                        >
                                            <option value="">All</option>
                                            <option value="successful">Successful</option>
                                            <option value="overdue">Overdue</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                        {/* End Select */}
                                    </div>
                                </div>
                                <div className="w-auto">
                                    <div className="flex items-center mr-2">
                                        <span className="text-secondary mr-2">Signed up:</span>
                                        {/* Select */}
                                        <select
                                            value={selectSignUp}
                                            onChange={(e) => setSelectSignUp(e.target.value)}
                                        >
                                            <option value="">All</option>
                                            <option value="1 year ago">1 year ago</option>
                                            <option value="6 months ago">6 months ago</option>
                                        </select>
                                        {/* End Select */}
                                    </div>
                                </div>
                                <div className="w-auto">
                                    <div className="flex items-center mr-2">
                                        <div className="flex">
                                            <div className="flex items-center p-2">
                                                <FaSearch className="text-gray-500"/>
                                            </div>
                                            <input
                                                style={{
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                }}
                                                type="search"
                                                className="border-0 focus:border-b "
                                                placeholder="Search users"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Filter */}
                        </div>
                    </div>
                </div>
                {/* End Header */}
                {/* Table */}
                <div className="overflow-x-auto">
                    <table
                        id="datatable"
                        className="table-auto border-collapse w-full"
                    >
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-8 py-2">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="datatableCheckAll"
                                        type="checkbox"
                                        className="custom-control-input"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="datatableCheckAll"
                                    />
                                </div>
                            </th>
                            <th className="pl-8 py-2">Full name</th>
                            <th className="pl-8 py-2">Status</th>
                            <th className="pl-8 py-2">Type</th>
                            <th className="pl-8 py-2">Email</th>
                            <th className="pl-8 py-2">Signed up</th>
                            <th className="pl-8 py-2">User ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-8 py-2">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"
                                               id={`usersDataCheck${user.id}`}/>
                                        <label className="custom-control-label" htmlFor={`usersDataCheck${user.id}`}/>
                                    </div>
                                </td>
                                <td className="px-8 py-2">
                                    <a className="flex items-center" href="./user-profile.html">
                                        <div className="w-8 h-8 rounded-full mr-2">
                                            <Image
                                                className="w-full h-full rounded-full"
                                                src={userImg}
                                                alt="Image Description"
                                            />
                                        </div>
                                        <div className="media-body">
                  <span className="text-primary mb-0">
                    {user.fullName}
                  </span>
                                        </div>
                                    </a>
                                </td>
                                <td className="px-8 py-2">
                      <span
                          className={`inline-block w-2.5 h-2.5 ${user.status === 'Successful' ? 'bg-success' : 'bg-danger'} rounded-full mr-1.5`}/>
                                    {user.status}
                                </td>
                                <td className="px-8 py-2">{user.type}</td>
                                <td className="px-8 py-2">{user.email}</td>
                                <td className="px-8 py-2">{user.signedUp}</td>
                                <td className="px-8 py-2">{user.userId}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* Footer */}
                <div className="px-8 border-t border-inherit">
                    {/* Pagination */}
                    <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
                        <div className="col-sm mb-2 mb-sm-0">
                            <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
                                <span className="mr-2">Showing:</span>
                                {/* Select */}
                                <select
                                    id="datatableEntries"
                                    className="js-select2-custom"
                                    data-hs-select2-options='{
                      "minimumResultsForSearch": "Infinity",
                      "customClass": "custom-select custom-select-sm custom-select-borderless",
                      "dropdownAutoWidth": true,
                      "width": true
                    }'
                                >
                                    <option value={4}>4</option>
                                    <option value={6}>6</option>
                                    <option value={8} selected="">
                                        8
                                    </option>
                                    <option value={12}>12</option>
                                </select>
                                {/* End Select */}
                                <span className="text-secondary mr-2">of</span>
                                {/* Pagination Quantity */}
                                <span id="datatableWithPaginationInfoTotalQty"/>
                            </div>
                        </div>
                        <div className="col-sm-auto">
                            <div className="d-flex justify-content-center justify-content-sm-end">
                                {/* Pagination */}
                                <nav id="datatablePagination" aria-label="Activity pagination"/>
                            </div>
                        </div>
                    </div>
                    {/* End Pagination */}
                </div>
                {/* End Footer */}
            </div>
        </div>

    )
};
export default UserSection;