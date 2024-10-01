'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import Input from "@/app/components/input";
import { addProfileImageApi } from "@/app/api/addProfileImageApi";

// Validation schema using Yup
const schema = Yup.object().shape({
    image: Yup.mixed().required('Image is required'), // Use mixed for file types
});

const AddImageModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            image: null,
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('image', values.image);

            // Log the FormData content to check if the image is added
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const result = await dispatch(addProfileImageApi(formData));
            if (addProfileImageApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                Swal.fire({
                    title: 'Success!',
                    text: 'Image added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onClose();
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue adding the image',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        validationSchema: schema,
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

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        console.log('Selected file:', file); // Log selected file
        formik.setFieldValue('image', file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-[30%]">
                <div className='flex justify-end items-center'>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX />
                    </button>
                </div>
                <h2 className="text-2xl mb-4">Add Image</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="file"
                            name='image'
                            label="Select Image"
                            className="w-full px-3 py-2 border rounded"
                            onChange={handleImageChange}  // Ensure this correctly sets the file
                            onBlur={formik.handleBlur}
                            error={formik.touched.image && formik.errors.image ? formik.errors.image : null}
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
                            Add Image
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddImageModal;
