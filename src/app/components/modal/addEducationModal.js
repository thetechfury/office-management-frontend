'use client';
import React, {useEffect, useRef} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import {createTeam} from "@/app/api/createTeamApi";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {FiX} from "react-icons/fi";
import Swal from "sweetalert2";
import Button from "@/app/components/button/button";
import TextArea from "@/app/components/textarea";
import {addWorkExperienceApi} from "@/app/api/addWorkExperienceApi";
import {addEducationApi} from "@/app/api/addEducationApi";

const educationSchema = Yup.object().shape({
    degree: Yup.string().required('Degree is required'),
    total_marks: Yup.string().required('Total marks are required'),
    obtain_marks: Yup.string().required('Obtain marks are required'),
    start_date: Yup.date().required('Start date is required'),
    end_date: Yup.date().required('End date is required'),
    institute: Yup.string().required('Institute is required'),
});

const AddEducationModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            degree: '',
            total_marks: '',
            obtain_marks: '',
            start_date: '',
            end_date: '',
            institute: ''
        },
        onSubmit: async (values) => {
            const result = await dispatch(addEducationApi(values));
            if (addEducationApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                Swal.fire({
                    title: 'Success!',
                    text: 'Education added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onClose();
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue ',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        validationSchema: educationSchema,
    });

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
                        className=" text-gray-500 hover:text-gray-700"
                    >
                        <FiX/>
                    </button>
                </div>
                <h2 className="text-2xl mb-4">Add Education</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="degree"
                            label="Degree"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.degree}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.degree && formik.errors.degree ? formik.errors.degree : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="total_marks"
                            label="Total Marks"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.total_marks}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.total_marks && formik.errors.total_marks ? formik.errors.total_marks : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="obtain_marks"
                            label="Obtain Marks"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.obtain_marks}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.obtain_marks && formik.errors.obtain_marks ? formik.errors.obtain_marks : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="date"
                            name="start_date"
                            label="Start Date"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.start_date && formik.errors.start_date ? formik.errors.start_date : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="date"
                            name="end_date"
                            label="End Date"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.end_date && formik.errors.end_date ? formik.errors.end_date : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="institute"
                            label="Institute"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.institute}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.institute && formik.errors.institute ? formik.errors.institute : null}
                            required={true}
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
                        <Button text="Add Education"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEducationModal;
