'use client';
import React, {useEffect, useState, useRef} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import {createTeam} from "@/app/api/createTeamApi";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getTeamLeaderApi} from "@/app/api/getTeamLeaderApi";
import CustomDropdown from "@/app/components/CustomDropdown/CustomDropdown";
import {FiX} from "react-icons/fi";
import Swal from "sweetalert2";

const schema = Yup.object().shape({
    name: Yup.string().required('Team Name is required'),
    description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
    leader: Yup.string().required('Team Leader is required'),
});

const CreateTeamModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const {teamLeader} = useSelector(state => state.auth);
    const [leaders, setLeaders] = useState([]);
    const modalRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            leader: "",
        },
        onSubmit: async (values) => {
            const result = await dispatch(createTeam(values));
            if (createTeam.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
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
                setLeaders(response.payload); // Adjust according to your actual data structure
            });
        }
    }, [dispatch, isOpen]);

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
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
                <div className='flex justify-end items-center'>
                    <button
                        type="button"
                        onClick={onClose}
                        className=" text-gray-500 hover:text-gray-700"
                    >
                        <FiX/>
                    </button>
                </div>
                <h2 className="text-2xl mb-4">Create Team</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name='name'
                            label="Team Name"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="description"
                            label="Description"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && formik.errors.description ? formik.errors.description : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Team Leader</label>
                        <CustomDropdown
                            options={leaders}
                            selectedValue={formik.values.leader}
                            onChange={(value) => formik.setFieldValue('leader', value)}
                            placeholder="Select team leader"
                            error={formik.touched.leader && formik.errors.leader ? formik.errors.leader : null}
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTeamModal;
