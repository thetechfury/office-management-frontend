'use client';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const AddImageModal = ({ isOpen, onClose, onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            openImageModal();
        }
    }, [isOpen]);

    const openImageModal = () => {
        Swal.fire({
            title: 'Upload Profile Image',
            html: `<input type="file" id="uploadImage" class="swal2-file">`,
            showCancelButton: true,
            confirmButtonText: 'Upload',
            preConfirm: () => {
                const file = Swal.getPopup().querySelector('#uploadImage').files[0];
                if (file) {
                    setSelectedImage(file);
                    return file;
                } else {
                    Swal.showValidationMessage('Please select an image');
                }
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append('image', result.value);

                try {
                    await onImageUpload(formData);  // Pass formData to the handler in UserProfile
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to upload the image.',
                        icon: 'error',
                    });
                    // Reopen the modal if the upload fails
                    openImageModal();
                    onClose();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                onClose();
            }
        });
    };

    return null; // No need to render anything, since SweetAlert2 handles the modal
};

export default AddImageModal;
