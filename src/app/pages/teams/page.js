'use client';
import Card from "@/app/components/card/card";
import Link from "next/link";
import {FaEllipsisV} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import rated from '@/app/assets/svg/star.svg'
import rated2 from '@/app/assets/svg/star-half.svg'
import user from '@/app/assets/images/img9.jpg'
import user1 from '@/app/assets/images/img6.jpg'
import Card2 from "@/app/components/card/card2";
import Content from "@/app/components/card/content";

const Teams = () => {
    const dropdownRef = useRef(null);
    const [dropdowns, setDropdowns] = useState({
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
        dropdown4: false,
        dropdown5: false,
        dropdown6: false,
        dropdown7: false,
    });

    const toggleDropdown = (dropdown) => {
        setDropdowns((prevDropdowns) => ({
            ...prevDropdowns,
            [dropdown]: !prevDropdowns[dropdown],
        }));
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdowns({
                dropdown1: false,
                dropdown2: false,
                dropdown3: false,
                dropdown4: false,
                dropdown5: false,
                dropdown6: false,
                dropdown7: false,
            });
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="mb-8">
            <div className="pb-6 pt-4"><h3>7 teams</h3></div>
            <div className="grid grid-cols-3 gap-4">
                <Card2 heading="#digitalmarketing" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                    <Content className='text-sm'
                             label="Our group promotes and sells products and services by leveraging online marketing tactics">
                        <div className="flex justify-between items-center pt-2">
                            <p>MEMBERS:</p>
                            <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                            </div>
                        </div>
                    </Content>
                </Card2>
                <Card2 heading="#ethereum" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                    <Content className='text-sm'
                             label="Our group promotes and sells products and services by leveraging online marketing tactics">
                        <div className="flex justify-between items-center pt-2">
                            <p>MEMBERS:</p>
                            <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                                <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                            </div>
                        </div>
                    </Content>
                </Card2>
                <Card2 heading="#conference" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                <Content className='text-sm'
                         label="Our group promotes and sells products and services by leveraging online marketing tactics">
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </Content>
            </Card2>
                <Card2 heading="#supportteam" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                <Content className='text-sm'
                         label="Our group promotes and sells products and services by leveraging online marketing tactics">
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </Content>
            </Card2>
                <Card2 heading="#invoices" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                <Content className='text-sm'
                         label="Our group promotes and sells products and services by leveraging online marketing tactics">
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </Content>
            </Card2>
                <Card2 heading="#payments" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                <Content className='text-sm'
                         label="Our group promotes and sells products and services by leveraging online marketing tactics">
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </Content>
            </Card2>
                <Card2 heading="#event" className='text-blue-600 text-lg font-thin' className1='!min-h-[20vh]'>
                <Content className='text-sm'
                         label="Our group promotes and sells products and services by leveraging online marketing tactics">
                    <div className="flex justify-between items-center pt-2">
                        <p>MEMBERS:</p>
                        <div className="flex px-2 py-1">
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem] ">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user1} alt='rated' className="rounded-full "/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">
                                <Image src={user} alt='rated' className="rounded-full"/>
                            </span>
                            <span className="rounded-full w-6 h-6 p-[2px] bg-white relative ml-[-.5rem]">+3</span>
                        </div>
                    </div>
                </Content>
            </Card2>
            </div>
        </div>
    )
};
export default Teams;