import {FaCheck, FaRegBell, FaSearch, FaTimes} from 'react-icons/fa';
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
    const [selectedItems, setSelectedItems] = useState([]);
    const {users, loading, error} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    // const { number_of_active_users, total_users, total_teams, active_user_percentage, users=[], loading, error } = users;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredUsers = users.filter((user) => {
        const statusMatch = selectedStatus ? user.is_active.toString() === selectedStatus : true;
        const signUpMatch = selectSignUp ? new Date(user.date_joined).getFullYear().toString() === selectSignUp : true;
        const searchMatch = searchTerm ? Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) : true;

        return statusMatch && signUpMatch && searchMatch;
    });
    const handleCheckboxChange = (userId) => {
        const selectedIndex = selectedItems.indexOf(userId);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, userId]);
        } else {
            const updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(selectedIndex, 1);
            setSelectedItems(updatedSelectedItems);
        }
    };

    const handleDeleteSelected = () => {
        // Handle deletion logic here based on selectedItems array
        console.log('Deleting selected items:', selectedItems);
        // Reset selectedItems state after deletion
        setSelectedItems([]);
    };

    return (<div className="px-4 sm:px-6 lg:px-8 pb-4">
            <div className="card shadow-md hover:shadow-lg h-full border border-inherit rounded-xl py-4">
                {/* Header */}
                <div className="pb-4 px-4">
                    <div className="flex flex-wrap justify-between items-center flex-grow-1">
                        <div className="w-full md:w-auto">
                            <div className="flex justify-between items-center">
                                <h5>Users</h5>
                            </div>
                        </div>
                        <div className="w-auto flex items-center">
                            <div className="flex items-center">
                                <span className="text-sm mr-3">
                                    <span>{selectedItems.length}</span> Selected
                                </span>
                                {selectedItems.length > 0 && (
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={handleDeleteSelected}
                                    >
                                        <i className="tio-delete-outlined"/> Delete
                                    </button>
                                )}
                            </div>

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
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
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
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
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
                                                    outline: 'none', boxShadow: 'none',
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
                            <th className="pl-8 py-2">Role</th>
                            <th className="pl-8 py-2">Email</th>
                            <th className="pl-8 py-2">Date Joined</th>
                            <th className="pl-8 py-2">USER ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-8 py-2">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={`usersDataCheck${user.id}`}
                                            onChange={() => handleCheckboxChange(user.id)}
                                            checked={selectedItems.includes(user.id)}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor={`usersDataCheck${user.id}`}
                                        /></div>
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
                                            {user.full_name}
                                          </span>
                                        </div>
                                    </a>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center mr-[40px]">
                                        {user.is_active ? (
                                            <FaCheck className="text-green-500"/>
                                        ) : (
                                            <FaTimes className="text-red-500"/>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-2">{user.role}</td>
                                <td className="px-8 py-2">{user.email}</td>
                                <td className="px-8 py-2">{user.date_joined}</td>
                                <td className="px-8 py-2">{user.id}</td>
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
                                    <option value={8}>8</option>
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
        </div>);
};

export default UserSection;
