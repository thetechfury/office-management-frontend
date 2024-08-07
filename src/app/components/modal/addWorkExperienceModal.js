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

const workExperienceSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    company_name: Yup.string().required('Company name is required'),
    description: Yup.string().required('Description is required'),
    joining_date: Yup.date().required('Joining date is required'),
    end_date: Yup.date().required('End date is required'),
    remarks: Yup.string()
});

const addWorkExperienceModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const formik = useFormik({
       initialValues: {
            title: '',
            company_name: '',
            description: '',
            joining_date: '',
            end_date: '',
            remarks: ''
        },
        onSubmit: async (values) => {
            const result = await dispatch(addWorkExperienceApi(values));
            if (addWorkExperienceApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                Swal.fire({
                    title: 'Success!',
                    text: 'Add Work Experience successfully',
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
        validationSchema: workExperienceSchema,
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
                <h2 className="text-2xl mb-4">Add Experience</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name='title'
                            label="Title"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && formik.errors.title ? formik.errors.title : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name='company_name'
                            label="Company Name"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.company_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.company_name && formik.errors.company_name ? formik.errors.company_name : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <TextArea
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
                        <Input
                            type="date"
                            name='joining_date'
                            label="Joining Date"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.joining_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.joining_date && formik.errors.joining_date ? formik.errors.joining_date : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="date"
                            name='end_date'
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
                        <TextArea
                            name="remarks"
                            label="Remarks"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.remarks}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : null}
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
                        <Button text="Add Work Experience"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default addWorkExperienceModal;
