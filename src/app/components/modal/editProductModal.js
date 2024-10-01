'use client';
import React, {useEffect, useRef} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {FiX} from "react-icons/fi";
import Swal from "sweetalert2";
import Button from "@/app/components/button/button";
import {usePathname} from "next/navigation";
import {categoryUpdateApi} from "@/app/api/categoryUpdateApi";
import {productUpdateApi} from "@/app/api/productUpdateApi";

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const EditProductModal = ({isOpen, onClose, data}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const {singleUser} = useSelector(state => state.auth);
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
        },
        enableReinitialize: true, // Add this line
        onSubmit: async (values) => {
            const result = await dispatch(productUpdateApi({id: data.id, credentials: values}));
            if (productUpdateApi.fulfilled.match(result)) {
                formik.resetForm();
                Swal.fire({
                    title: 'Success!',
                    text: 'Product updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onClose();
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue updating Product',
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
                <h2 className="text-2xl mb-4">Edit Product</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name='name'
                            label="Product Name"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
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
                        <Button text="Save changes"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
