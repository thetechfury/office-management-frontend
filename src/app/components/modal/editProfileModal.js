'use client';
import React, {useEffect, useRef} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {FiX} from "react-icons/fi";
import Swal from "sweetalert2";
import Button from "@/app/components/button/button";
import {getSingleUserApi} from "@/app/api/getSingleUserApi";
import {usePathname} from "next/navigation";

const aboutSchema = Yup.object().shape({
    full_name: Yup.string(),
    role: Yup.string(),
    email: Yup.string(),
});

const EditProfileModal = ({isOpen, onClose, profileData}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const {singleUser, userSingle} = useSelector(state => state.auth);
    const userIdFromStorage = localStorage.getItem('userId');
    const currentUserId = singleUser?.id;
    const currentPage = usePathname();
    const id = currentPage === '/pages/user_profile' ? currentUserId : userIdFromStorage;

    const formik = useFormik({
        initialValues: {
            full_name: profileData ? profileData.full_name : '',
            role: profileData ? profileData.role : '',
            email: profileData ? profileData.email : '',
        },
        enableReinitialize: true,  // This ensures the form is reset with new data whenever profileData changes
        onSubmit: async (values) => {
            const result = await dispatch(getSingleUserApi({ id, ...values }));
            if (getSingleUserApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    onClose();
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue updating the profile',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        validationSchema: aboutSchema,
    });

    useEffect(() => {
        if (id && isOpen) {
            dispatch(getSingleUserApi(id));
        }
    }, [id, dispatch, isOpen]);

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
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-[40%]">
                <div className='flex justify-end items-center'>
                    <button
                        type="button"
                        onClick={() => {
                            formik.resetForm();
                            onClose();
                        }}
                        className=" text-gray-500 hover:text-gray-700"
                    >
                        <FiX/>
                    </button>
                </div>
                <h2 className="text-2xl mb-4">Edit Profile</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="flex justify-between">
                        <Input
                            type="text"
                            name="full_name"
                            label="Name"
                            className="w-full px-3 py-2 border rounded "
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.full_name && formik.errors.full_name ? formik.errors.full_name : null}
                            required={true}
                        />
                        <Input
                            type="text"
                            name="role"
                            label="Role"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && formik.errors.role ? formik.errors.role : null}
                            required={true}
                        />
                    </div>
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        className="w-full px-3 py-2 border rounded"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        required={true}
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 rounded"
                            onClick={() => {
                                formik.resetForm();
                                onClose();
                            }}
                        >
                            Cancel
                        </button>
                        <Button text="Save Changes"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
