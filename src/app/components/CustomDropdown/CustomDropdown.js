import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch, FiX } from 'react-icons/fi';

const CustomDropdown = ({ options = [], selectedValue, onChange, placeholder, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!Array.isArray(options)) {
            console.error('Expected options to be an array but got:', options);
            return;
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const newFilteredOptions = options.filter(option => {
            const searchMatch = searchTerm
                ? Object.values(option).some(value =>
                    value && value.toString().toLowerCase().includes(lowercasedSearchTerm)
                )
                : true;
            return searchMatch;
        });

        setFilteredOptions(newFilteredOptions);
    }, [searchTerm, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    const handleClear = () => {
        setSearchTerm("");
    };

    const getSelectedValue = () => {
        if (!Array.isArray(options)) {
            console.error('Expected options to be an array but got:', options);
            return placeholder;
        }

        const selectedOption = options.find(option => option.id === selectedValue);
        if (selectedOption) {
            return selectedOption.email || selectedOption.name || placeholder;
        }
        return placeholder;
    };

    return (
        <div ref={dropdownRef} className="relative">
            <div
                className={`cursor-pointer w-full px-3 py-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'} flex items-center justify-between`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    {getSelectedValue()}
                </div>
                <span className="text-gray-500">
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
            </div>
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border-b rounded-t-lg pl-6" // Add padding to accommodate the search icon
                        />
                        {!searchTerm && (
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FiSearch />
                            </span>
                        )}
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length ? (
                            filteredOptions.map(option => (
                                <div
                                    key={option.id}
                                    onClick={() => handleSelect(option.id)}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {option.email || option.name} {option.role && `(${option.role})`}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500">No options found</div>
                        )}
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default CustomDropdown;
