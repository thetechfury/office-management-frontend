'use client'
import MainDiv from "@/app/components/mainDiv/mainDiv";
import {FaCheck, FaSearch, FaTimes, FaTrash} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Shoes from "@/app/assets/images/img6.jpg";
import Button from "@/app/components/button/button";
import {MdOutlineCreate} from "react-icons/md";
import React, {useCallback, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";
import {getProductListApi} from "@/app/api/getProductListApi";
import Swal from "sweetalert2";
import {deleteProductApi} from "@/app/api/deleteProductApi";
import TableCard from "@/app/components/card/tableCard";

const AddProductsModal = dynamic(() => import('@/app/components/modal/addProductsModal'), {ssr: false});
const EditProductModal = dynamic(() => import('@/app/components/modal/editProductModal'), {ssr: false});

const Products = () => {
    const dispatch = useDispatch();
    const {product} = useSelector(state => state.auth)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const [selectProduct, setSelectProduct] = useState(null)
    useEffect(() => {
        dispatch(getProductListApi())
    }, [dispatch]);
    const handleDeleteProduct = (id) => {
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
                dispatch(deleteProductApi(id)).then(() => {
                    dispatch(getProductListApi())
                });
                Swal.fire(
                    'Deleted!',
                    'Your selected product have been deleted.',
                    'success'
                );
            }
        });
    };
    const handleEdit = useCallback((item) => {
        setSelectProduct(item);
        openEditModal(true);

    }, []);

    return (
        <MainDiv>
            <div className="px-4 sm:px-6 lg:px-8 pb-4 mx-auto lg:w-10/12">
                <div className="bg-profile-image bg-cover top-0 left-0 right-0 h-[10rem] rounded-lg"></div>
                <TableCard>
                    {/* Header */}
                    <div className="pb-4 px-4">
                        <div className="flex flex-wrap justify-between items-center flex-grow-1">
                            <div className="w-full md:w-auto">
                                <div className="flex justify-between items-center">
                                    <h5>All Products</h5>
                                </div>
                            </div>
                            <div className="w-auto flex items-center">
                                {/* Filter */}
                                <div className="flex flex-wrap items-center">
                                    <div className="w-auto">
                                        <div className="flex items-center mr-2">
                                            <span className="text-secondary mr-2">Status:</span>
                                            {/* Select */}
                                            <select
                                                className=""
                                                value=""
                                                style={{border: "none"}}
                                            >
                                                <option value="">All</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                            {/* End Select */}
                                        </div>
                                    </div>
                                    <div className="w-auto">
                                        <div className="flex items-center mr-2 ">

                                            <div className="flex items-center p-2">
                                                <FaSearch className="text-gray-500"/>
                                            </div>
                                            <input
                                                style={{
                                                    outline: 'none', boxShadow: 'none',
                                                }}
                                                type="search"
                                                className="border-0 border-b border-gray-300 focus:border-b text-[.8125rem]"
                                                placeholder="Search users"
                                                value='searchTerm'

                                            />
                                        </div>
                                    </div>
                                    <div className='w-auto'>
                                        <Button icon={<MdOutlineCreate className="mr-2"/>} text='Add Products'
                                                onClick={openModal}/>
                                    </div>
                                </div>
                                {/* End Filter */}
                            </div>
                        </div>
                    </div>
                    {/* End Header */}
                    {/* Table */}
                    <div className="overflow-x-auto max-h-[55vh]">
                        <table
                            id="datatable"
                            className="table-auto border-collapse w-full"
                        >
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="pl-8 py-2">#</th>
                                <th className="py-2">Name of product</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Stock Info</th>
                                <th className="py-2">Category</th>
                                <th className="py-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {product.map((item, index) => (
                                <tr className='border-b' key={item.id}>
                                    <td className="px-8 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="py-2">
                                        <Link className="flex items-center" href="/">
                                            <div className="w-8 h-8 rounded-full mr-2">
                                                <Image
                                                    className="w-full h-full rounded-full"
                                                    src={Shoes}
                                                    alt="Image Description"
                                                />
                                            </div>
                                            <div className="media-body">
                                          <span className="text-primary mb-0">
                                            {item.name}
                                          </span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            {item.isActive ? (
                                                <FaCheck className="text-green-500"/>
                                            ) : (
                                                <FaTimes className="text-red-500"/>
                                            )}
                                            {item.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                    </td>
                                    <td className="py-2"> {item.total_quantity}</td>
                                    <td className="py-2">{item.category}</td>
                                    <td className="w-52">
                                        <div className="flex">
                                            <button
                                                className="btn btn-sm flex mr-2 px-4 py-2 justify-between items-center border border-inherite rounded-md text-gray-500 hover:bg-gray-500 hover:text-white"
                                                onClick={() => handleEdit(item)}
                                            >
                                                <MdOutlineCreate className="mr-2"/> Edit
                                            </button>
                                            <button
                                                className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                                onClick={() => handleDeleteProduct(item.id)}
                                            >
                                                <FaTrash className="mr-2"/> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </TableCard>
            </div>
            <AddProductsModal isOpen={isModalOpen} onClose={closeModal}/>
            <EditProductModal isOpen={isEditModalOpen} onClose={closeEditModal} data={selectProduct}/>
        </MainDiv>
    )
}
export default Products;