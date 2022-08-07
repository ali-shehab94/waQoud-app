import React from 'react';
import './UserVehiclesModal.css';
import { AiOutlineClose } from 'react-icons/ai';

function UserVehiclesModal(props) {
    return (
        <div className='container'>
            <div className='modal'>
                UserVehiclesModal
                <div className='close'>
                    <AiOutlineClose size={30} />
                </div>
            </div>
        </div>
    );
}

export default UserVehiclesModal;
