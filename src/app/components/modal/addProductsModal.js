'use client';
import React, {useEffect, useRef, useState} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {FiX} from "react-icons/fi";
import Swal from "sweetalert2";
import Button from "@/app/components/button/button";
import {addEducationApi} from "@/app/api/addEducationApi";
import CustomDropdown from "@/app/components/CustomDropdown/CustomDropdown";
import {addProductApi} from "@/app/api/addProductApi";
import {getCategoryListApi} from "@/app/api/getCategoryListApi";

const productsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    total_quantity: Yup.number().required('Stock are required'),
    unit_price: Yup.number().required('Price are required'),
    category: Yup.string().required('Category are required'),
});

const AddProductsModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [category, setCategory] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            unit_price:0,
            total_quantity: 0,
            category: '',
        },
        onSubmit: async (values) => {
            const result = await dispatch(addProductApi(values));
            if (addProductApi.fulfilled.match(result)) {
                formik.resetForm();  // Reset form fields
                Swal.fire({
                    title: 'Success!',
                    text: 'Product added successfully',
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
        validationSchema: productsSchema,
    });
    useEffect(() => {
        dispatch(getCategoryListApi()).then(response => {
            setCategory(Array.isArray(response.payload) ? response.payload : []);
        });
    }, [dispatch]);

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
                <h2 className="text-2xl mb-4">Add Product</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="name"
                            label="Product name"
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
                            type='number'
                            name="unit_price"
                            label="Unit Price"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.unit_price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.unit_price && formik.errors.unit_price ? formik.errors.unit_price : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type='number'
                            name="total_quantity"
                            label="Total Quantity"
                            className="w-full px-3 py-2 border rounded"
                            value={formik.values.total_quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.total_quantity && formik.errors.total_quantity ? formik.errors.total_quantity : null}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <CustomDropdown
                            options={category}
                            selectedValue={formik.values.category}
                            placeholder="Select a Category"
                            onChange={(value) => formik.setFieldValue('category', value)}
                            error={formik.touched.category && formik.errors.category ? formik.errors.category : null}
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
                        <Button type="submit" text="Add Product"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductsModal;
