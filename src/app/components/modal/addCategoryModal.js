'use client';
import React, {useEffect, useRef} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {FiX} from "react-icons/fi";
import Swal from "sweetalert2";
import Button from "@/app/components/button/button";
import {addCategoryApi} from "@/app/api/addCategoryApi";

const productsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    image: Yup.string(),
});

const AddCategoryModal = ({isOpen, onClose, onAddCategory}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
        },
        onSubmit: async (values) => {
            const result = await dispatch(addCategoryApi(values));
            if (addCategoryApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                Swal.fire({
                    title: 'Success!',
                    text: 'Category added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onAddCategory(result.payload);
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
        validationSchema: productsSchema,
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
                <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Category Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                    />
                    <Input
                        type="file"
                        id="image"
                        name="image"
                        placeholder="Category Image URL"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.image && formik.touched.image ? formik.errors.image : null}
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <Button type="submit" text="Add Category" className="w-full mt-4"/>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;
