'use client';
import {
    FaChevronDown,
    FaChevronUp,
    FaRegBell,
    FaSearch,
    FaTimes
} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import profileImg from "../../assets/images/img6.jpg"
import {BiGridAlt} from "react-icons/bi";
import {HiArrowTrendingUp} from "react-icons/hi2";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/app/slices/authSlice";
// import {getUserProfile} from "@/app/api/getUserProfileApi";
import {useRouter} from "next/navigation";
import logo from "@/app/assets/svg/logo.svg";


const Topbar = () => {
    const [showCloseIcon, setShowCloseIcon] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmenuOpen1, setIsSubmenuOpen1] = useState(false);
    const [isSubmenuOpen2, setIsSubmenuOpen2] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();
    // const {userProfile} = useSelector((state) => state.auth);
    //  useEffect(() => {
    //     dispatch(getUserProfile());
    // }, [dispatch]);
    // console.log(userProfile)
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleSubmenu1 = () => {
        setIsSubmenuOpen1(!isSubmenuOpen1);
    };

    const toggleSubmenu2 = () => {
        setIsSubmenuOpen2(!isSubmenuOpen2);
    };
    const handleClearInput = () => {
        setSearchValue("");
    };
    const handleLogout = () => {
        router.push('../../signin');
        dispatch(logout());
        setIsDropdownOpen(false); // Close the dropdown after logging out
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
    return (
        <div
            className="fixed flex items-center z-[1] top-0  w-full bg-white text-black border border-b border-inherit py-2  pr-[2rem] ">
            <div className=" pl-[10px]">
                <Image src={logo} alt='logo' className="w-full min-w-[6.5rem] max-w-[5.5rem]"/>

            </div>
            <div className="container ml-auto flex items-center sm:justify-between justify-end">
                <div
                    className="ml-4 lg:ml-[172px] flex items-center w-[120px] sm:w-[auto] bg-white rounded-lg p-2 transition-colors duration-300 hover:bg-[#f6f7fa]"
                    onMouseEnter={() => setShowCloseIcon(true)}
                    onMouseLeave={() => setShowCloseIcon(false)}
                >
                    <FaSearch className="text-gray-500"/>
                    <input
                        style={{
                            outline: 'none',
                            boxShadow: 'none',
                            borderColor: 'transparent'
                        }}
                        type="text"
                        className="bg-transparent pl-2 outline-none border-0 w-[120px] sm:w-[auto]"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {showCloseIcon && (
                        <FaTimes
                            className="text-gray-500 cursor-pointer"
                            onClick={handleClearInput}

                        />
                    )}
                </div>
                <ul className="flex">
                    <li className="mx-3 w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d] hidden sm:flex">
                        <FaRegBell/>
                    </li>
                    <li className="mx-3 w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d] hidden sm:flex">
                        <BiGridAlt/>
                    </li>
                    <li className="mx-3 w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[rgba(55,125,255,0.1)] hover:text-[#377dff] text-[#71869d] hidden sm:flex">
                        <HiArrowTrendingUp/>
                    </li>

                    <li className="nav-item">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center"
                                onClick={toggleDropdown}
                            >
                                <div className="avatar avatar-sm avatar-circle">
                                    <Image className="avatar-img w-8 h-8 rounded-full" src={profileImg}
                                           alt="profile image"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-8 pb-4
                                     w-64 bg-white dark:bg-gray-700 rounded-lg shadow-custom-shadow">


            {/*    {userProfile ? (*/}
            {/*        <div>*/}
            {/*            {userProfile.user && (*/}
            {/*                <>*/}
            {/*                    <p>Email: {userProfile.user.email}</p>*/}
            {/*                    <p>Role: {userProfile.user.role}</p>*/}
            {/*                    <p>Full Name: {userProfile.user.full_name}</p>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*            <p>Date of Birth: {userProfile.date_of_birth}</p>*/}
            {/*            <p>Bio: {userProfile.bio}</p>*/}
            {/*            <p>Phone: {userProfile.phone}</p>*/}
            {/*            /!* Handle null or missing profile image *!/*/}
            {/*            <p>Profile Image: {userProfile.profile_image ?*/}
            {/*                <img src={userProfile.profile_image} alt="Profile"/> : "No image available"}</p>*/}
            {/*            /!* Display address if available *!/*/}
            {/*            {userProfile.address && <p>Address: {userProfile.address}</p>}*/}
            {/*            /!* Display skills if available *!/*/}
            {/*            {userProfile.skills && userProfile.skills.length > 0 && (*/}
            {/*                <div>*/}
            {/*                    <h3>Skills</h3>*/}
            {/*                    <ul>*/}
            {/*                        {userProfile.skills.map((skill, index) => (*/}
            {/*                            <li key={index}>{skill}</li>*/}
            {/*                        ))}*/}
            {/*                    </ul>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*            /!* Display education if available *!/*/}
            {/*            {userProfile.educations && userProfile.educations.length > 0 && (*/}
            {/*                <div>*/}
            {/*                    <h3>Education</h3>*/}
            {/*                    <ul>*/}
            {/*                        {userProfile.educations.map((education, index) => (*/}
            {/*                            <li key={index}>{education}</li>*/}
            {/*                        ))}*/}
            {/*                    </ul>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*            /!* Display experience if available *!/*/}
            {/*            {userProfile.experience && userProfile.experience.length > 0 && (*/}
            {/*                <div>*/}
            {/*                    <h3>Experience</h3>*/}
            {/*                    <ul>*/}
            {/*                        {userProfile.experience.map((exp, index) => (*/}
            {/*                            <li key={index}>{exp}</li>*/}
            {/*                        ))}*/}
            {/*                    </ul>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p>No user profile data available.</p>*/}
            {/*    )}*/}
            {/*</div>*/}


                                    <div className="px-4 py-3">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <Image className="avatar-img w-8 h-8 rounded-full" src={profileImg}
                                                       alt="profile image"/>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-900 dark:text-white">Mark Williams</span>
                                                <span
                                                    className="block text-gray-500 dark:text-gray-300">mark@example.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                                    <button
                                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                        onClick={toggleSubmenu1}
                                    >
                                        <span className="text-truncate pr-2">Set status</span>
                                        {isSubmenuOpen1 ? <FaChevronUp/> : <FaChevronDown/>}
                                    </button>
                                    {isSubmenuOpen1 && (
                                        <div className="ml-4">
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Available</a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Busy</a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Away</a>
                                            <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Reset
                                                status</a>
                                        </div>
                                    )}

                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Profile &amp; account</a>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Settings</a>
                                    <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                    <div className="px-4 py-2">
                                        <div className="flex items-center">
                                            <div
                                                className="w-8 h-8 bg-gray-800 rounded-full mr-2 flex items-center justify-center text-white">
                                                HS
                                            </div>
                                            <div>
                                                <span
                                                    className="block font-bold text-gray-900 dark:text-white">Htmlstream</span>
                                                <span
                                                    className="block text-gray-500 dark:text-gray-300">hs.example.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                                    <button
                                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                        onClick={toggleSubmenu2}
                                    >
                                        <span className="text-truncate pr-2">Customization</span>
                                        {isSubmenuOpen2 ? <FaChevronUp/> : <FaChevronDown/>}
                                    </button>
                                    {isSubmenuOpen2 && (
                                        <div className="ml-4">
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Invite
                                                people</a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Analytics</a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Customize
                                                Front</a>
                                        </div>
                                    )}

                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Manage
                                        team</a>
                                    <div className="border-t border-gray-200 dark:border-gray-600"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Sign
                                        out
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;