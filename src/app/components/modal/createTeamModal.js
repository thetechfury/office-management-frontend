'use client';
import React, { useState } from 'react';

const CreateTeamModal = ({ isOpen, onClose }) => {
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [teamLeader, setTeamLeader] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ teamName, teamDescription, teamLeader });
        onClose(); // Close the modal after submission
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Create Team</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Team Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={teamDescription}
                            onChange={(e) => setTeamDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Team Leader</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={teamLeader}
                            onChange={(e) => setTeamLeader(e.target.value)}
                            required
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTeamModal;
