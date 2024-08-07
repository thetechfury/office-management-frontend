'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { deleteUser } from "@/app/api/deleteUserApi";
import { getTeamMemberApi } from "@/app/api/getTeamMemberApi";
import { FaSearch, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import userImg from "@/app/assets/images/img6.jpg";
import {deleteMemeberApi} from "@/app/api/deleteMemberApi";

const DeleteMemberModal = ({ isOpen, onClose, teamId }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(7);

    const { loading, error, singleTeamMember } = useSelector(state => state.auth);

    useEffect(() => {
        if (isOpen && teamId) {
            dispatch(getTeamMemberApi(teamId));
        }
    }, [dispatch, isOpen, teamId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!isOpen) return null;

    const filteredUsers = singleTeamMember && Array.isArray(singleTeamMember.members)
        ? singleTeamMember.members.filter((member) => {
            const searchMatch = searchTerm
                ? Object.values(member).some(value =>
                    value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
                : true;
            return searchMatch;
        })
        : [];

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleUsersPerPageChange = (event) => {
        setUsersPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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

    const handleSelectAllChange = (event) => {
        if (event.target.checked) {
            setSelectedItems(currentUsers.map(member => member.id));
        } else {
            setSelectedItems([]);
        }
    };

   const handleDeleteSelected = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                selectedItems.forEach(userId => {
                    dispatch(deleteMemberApi(userId));
                });
                setSelectedItems([]);
                Swal.fire(
                    'Deleted!',
                    'Your selected members have been deleted.',
                    'success'
                );
                onClose(); // Close the modal after deletion
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
                <div className='flex justify-end items-center'>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX />
                    </button>
                </div>
                <div className="card shadow-md hover:shadow-lg h-full border border-inherit rounded-xl py-4">
                    <div className="pb-4 px-4">
                        <div className="flex flex-wrap justify-between items-center flex-grow-1">
                            <div className="w-full md:w-auto">
                                <div className="flex justify-between items-center">
                                    <h5>Members</h5>
                                </div>
                            </div>
                            <div className="w-auto flex items-center">
                                {selectedItems.length > 0 && (
                                    <div className="flex items-center mr-8">
                                        <span className="text-sm mr-3">
                                            <span>{selectedItems.length}</span> Selected
                                        </span>
                                        <button
                                            className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                            onClick={handleDeleteSelected}
                                        >
                                            <FaTrash className="mr-2" /> Delete
                                        </button>
                                    </div>
                                )}
                                <div className="flex flex-wrap items-center">
                                    <div className="w-auto">
                                        <div className="flex items-center mr-2">
                                            <div className="flex items-center p-2">
                                                <FaSearch className="text-gray-500" />
                                            </div>
                                            <input
                                                style={{ outline: 'none', boxShadow: 'none' }}
                                                type="search"
                                                className="border-0 border-b border-gray-300 focus:border-b text-[.8125rem]"
                                                placeholder="Search users"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-8 py-2">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                style={{ outline: 'none', boxShadow: 'none' }}
                                                id="datatableCheckAll"
                                                type="checkbox"
                                                className="border-gray-300 rounded-sm"
                                                onChange={handleSelectAllChange}
                                                checked={selectedItems.length === currentUsers.length && currentUsers.length > 0}
                                            />
                                            <label className="custom-control-label" htmlFor="datatableCheckAll" />
                                        </div>
                                    </th>
                                    <th className="pl-8 py-2">Full name</th>
                                    <th className="pl-8 py-2">Role</th>
                                    <th className="pl-8 py-2">Email</th>
                                    <th className="pl-8 py-2">Date Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(member => (
                                    <tr key={member.id}>
                                        <td className="px-8 py-2">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    style={{ outline: 'none', boxShadow: 'none' }}
                                                    type="checkbox"
                                                    className="border-gray-300 rounded-sm"
                                                    id={`usersDataCheck${member.id}`}
                                                    onChange={() => handleCheckboxChange(member.id)}
                                                    checked={selectedItems.includes(member.id)}
                                                />
                                                <label className="custom-control-label" htmlFor={`usersDataCheck${member.id}`} />
                                            </div>
                                        </td>
                                        <td className="px-8 py-2">
                                            <Link className="flex items-center" href="/">
                                                <div className="w-8 h-8 rounded-full mr-2">
                                                    <Image className="w-full h-full rounded-full" src={member.image || userImg} alt="Image Description" width='30' height='30'/>
                                                </div>
                                                <span className="font-medium text-sm text-gray-800">{member.user.full_name}</span>
                                            </Link>
                                        </td>
                                        <td className="px-8 py-2">{member.user.role}</td>
                                        <td className="px-8 py-2">{member.user.email}</td>
                                        <td className="px-8 py-2">{new Date(member.user.date_joined).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center py-3 px-6">
                        <div>
                            <span className="text-sm text-gray-600">
                                Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {filteredUsers.length} entries
                            </span>
                        </div>
                        <div>
                            <select
                                className="border-gray-300 rounded-sm text-sm"
                                value={usersPerPage}
                                onChange={handleUsersPerPageChange}
                            >
                                <option value={7}>7</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="btn btn-sm px-3 py-1 border-gray-300 rounded-sm text-sm"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="mx-2 text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                            <button
                                className="btn btn-sm px-3 py-1 border-gray-300 rounded-sm text-sm"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteMemberModal;
