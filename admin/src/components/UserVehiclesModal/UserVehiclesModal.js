import React from 'react';
import './UserVehiclesModal.css';
import { AiOutlineClose } from 'react-icons/ai';
import { MdSignalCellularNodata } from 'react-icons/md';

function UserVehiclesModal({ clearData }) {
    return (
        <div className='container'>
            <div className='modal'>
                UserVehiclesModal
                <div className='close' onClick={() => clearData()}>
                    <AiOutlineClose size={30} />
                </div>
            </div>
        </div>
    );
}

export default UserVehiclesModal;
