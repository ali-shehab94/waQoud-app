import React from 'react';
import './UserVehiclesModal.css';
import { AiOutlineClose } from 'react-icons/ai';
import { IoCarSport } from 'react-icons/io5';

function UserVehiclesModal({ data, clearData }) {
    return (
        <div className='container'>
            <div className='modal'>
                <div className='close' onClick={() => clearData()}>
                    <AiOutlineClose size={30} />
                </div>
                <div className='modal-title'>
                    <h1>User Vehicles</h1>
                </div>
                <div className='vehicles-container'>
                    {/* map vehicles brought from parent component */}
                    {data ? (
                        data.map((vehicle) => (
                            <div className='display-user-vehicles' key={vehicle[0].id}>
                                <h4 className='vehicle'>
                                    <IoCarSport size={30} />
                                    {vehicle[0].make.charAt(0).toUpperCase() +
                                        vehicle[0].make.substring(1) +
                                        ' ' +
                                        vehicle[0].model.charAt(0).toUpperCase() +
                                        vehicle[0].model.substring(1) +
                                        ' ' +
                                        vehicle[0].year}
                                </h4>
                            </div>
                        ))
                    ) : (
                        <div className='display-user-vehicles'>
                            <h4 className='vehicle'>User has no vehicles</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserVehiclesModal;
