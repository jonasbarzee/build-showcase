import React, { useEffect, useRef } from 'react';
import { useUser } from '@src/UserContext';

export function Dialog({ isOpen, onClose, title, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className='custom-modal p-4' onCancel={onClose}>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h3 className='m-0'>{title}</h3>
                <button className='btn-close' onClick={onClose} aria-label='Close'></button>
            </div>

            <div className='modal-content-body'>
                {children}
            </div>
        </dialog>
    );
}
