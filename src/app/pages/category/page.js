'use client'
import MainDiv from "@/app/components/mainDiv/mainDiv";
import {FaCheck, FaSearch, FaTimes, FaTrash} from "react-icons/fa";
import Image from "next/image";
import Button from "@/app/components/button/button";
import {MdOutlineCreate} from "react-icons/md";
import React, {useCallback, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {getCategoryListApi} from "@/app/api/getCategoryListApi";
import {useDispatch} from "react-redux";
import laptop from "@/app/assets/images/laptop.jpeg";
import iphone from "@/app/assets/images/iphone.jpeg";
import furniture from "@/app/assets/images/table.jpeg";
import accessory from "@/app/assets/images/accessory.jpeg";
import {deleteCategoryApi} from "@/app/api/deleteCategoryApi";
import Swal from "sweetalert2";
import TableCard from "@/app/components/card/tableCard";

const AddCategoryModal = dynamic(() => import('@/app/components/modal/addCategoryModal'), {ssr: false});
const EditCategoryModal = dynamic(() => import('@/app/components/modal/editCategoryModal'), {ssr: false});

const Category = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null)

    useEffect(() => {
        dispatch(getCategoryListApi()).then(response => {
            setCategory(Array.isArray(response.payload) ? response.payload : []);
        });
    }, [dispatch]);
    const handleDelete = (id) => {
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
                dispatch(deleteCategoryApi(id)).then(() => {
                    dispatch(getCategoryListApi()).then(response => {
                        setCategory(Array.isArray(response.payload) ? response.payload : []);
                    });
                });
                Swal.fire(
                    'Deleted!',
                    'Your selected category have been deleted.',
                    'success'
                );
            }
        });
    };
    const handleAddCategory = (newCategory) => {
        setCategory([...category, newCategory]);
        closeModal();
    };
    const categoryImageMap = {
        'Laptop': laptop,
        'iPhone': iphone,
        'Furniture': furniture,
        'Accessory': accessory,
    };
    const handleEdit = useCallback((cat) => {
        setSelectCategory(cat);
        openEditModal(true);

    }, []);
    const handleUpdateCategory = (updatedCategory) => {
        setCategory(prevCategory =>
            prevCategory.map(cat =>
                cat.id === updatedCategory.id ? updatedCategory : cat
            )
        );
    };
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
                                    <h5>All Categories</h5>
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
                                                placeholder="Search categories"
                                                value='searchTerm'
                                            />
                                        </div>
                                    </div>
                                    <div className='w-auto'>
                                        <Button icon={<MdOutlineCreate className="mr-2"/>} text='Add Category'
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
                                <th className="py-2">Name of category</th>
                                <th className="py-2">Image</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {category.map((cat, index) => (
                                <tr key={cat.id} className='border-b'>
                                    <td className="pl-8">{index + 1}</td>
                                    <td className="py-2 w-60">{cat.name}</td>
                                    <td className="py-2">
                                        <div className="w-16 h-16 rounded-md">
                                            <Image
                                                className="w-full h-full"
                                                src={categoryImageMap[cat.name] || iphone}
                                                alt="Category Image"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            {cat.isActive ? (
                                                <FaCheck className="text-green-500"/>
                                            ) : (
                                                <FaTimes className="text-red-500"/>
                                            )}
                                            {cat.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                    </td>
                                    <td className="w-52">
                                        <div className="flex">
                                            <button
                                                className="btn btn-sm flex mr-2 px-4 py-2 justify-between items-center border border-inherite rounded-md text-gray-500 hover:bg-gray-500 hover:text-white"
                                                onClick={() => handleEdit(cat)}
                                            >
                                                <MdOutlineCreate className="mr-2"/> Edit
                                            </button>
                                            <button
                                                className="btn btn-sm flex px-4 py-2 justify-between items-center border border-[#ed4c78] rounded-md text-[#ed4c78] hover:bg-[#ed4c78] hover:text-white"
                                                onClick={() => handleDelete(cat.id)}
                                            >
                                                <FaTrash className="mr-2"/> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </TableCard>
            </div>
            <AddCategoryModal isOpen={isModalOpen} onClose={closeModal} onAddCategory={handleAddCategory}/>
            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                data={selectCategory}
                onUpdateCategory={handleUpdateCategory}
            />
        </MainDiv>
    )
}

export default Category;
