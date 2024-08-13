'use client';
import React, {useEffect, useState, useRef} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {FiX} from "react-icons/fi";
import CustomDropdown from "@/app/components/CustomDropdown/CustomDropdown";
import {getTeamLeaderApi} from "@/app/api/getTeamLeaderApi";
import {addMemebersApi} from "@/app/api/addMembersApi";
import Swal from "sweetalert2";
import Input from "@/app/components/input";
import {getAllTeamApi} from "@/app/api/getAllTeamApi";

// Validation schema using Yup
const schema = Yup.object().shape({
    user: Yup.string().required('User is required'),
    team: Yup.number().required('Team is required'), // Use number to match expected pk type
});

const AddMembersModal = ({isOpen, onClose, teamData}) => {
    const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
    const modalRef = useRef(null);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            user: "",
            team: teamData ? teamData.id : "", // Use team's ID
        },
        onSubmit: async (values) => {
            const result = await dispatch(addMemebersApi(values)); // Corrected typo
            if (addMemebersApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                await dispatch(getAllTeamApi());
                Swal.fire({
                    title: 'Success!',
                    text: 'Team created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onClose();
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue creating the team',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        validationSchema: schema,
    });

    useEffect(() => {
        if (isOpen) {
            dispatch(getTeamLeaderApi()).then(response => {
                setMembers(response.payload);
            });
        }
    }, [dispatch, isOpen]);

    useEffect(() => {
        // Update formik values when teamData changes
        if (teamData) {
            formik.setFieldValue('team', teamData.id); // Set the team ID
        }
    }, [teamData]);

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-[30%]">
                <div className='flex justify-end items-center'>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX/>
                    </button>
                </div>
                <h2 className="text-2xl mb-4">Add Members</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">User</label>
                        <CustomDropdown
                            options={members}
                            selectedValue={formik.values.user}
                            onChange={(value) => formik.setFieldValue('user', value)}
                            placeholder="Select user"
                            error={formik.touched.user && formik.errors.user ? formik.errors.user : null}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name='team'
                            label="Team Name"
                            className="w-full px-3 py-2 border rounded"
                            value={teamData ? teamData.name : ''} // Display the team name but don't change it
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.team && formik.errors.team ? formik.errors.team : null}
                            readOnly // Make the field read-only since we're using the ID for submission
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            Add Members
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMembersModal;
