import React from 'react';
import './UserVehiclesModal.css';
import { AiOutlineClose } from 'react-icons/ai';

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
                    {data
                        ? data.map((vehicle) => (
                              <div className='display-user-vehicles' key={vehicle[0].id}>
                                  {vehicle[0].make.charAt(0).toUpperCase() +
                                      vehicle[0].make.substring(1) +
                                      ' ' +
                                      vehicle[0].model.charAt(0).toUpperCase() +
                                      vehicle[0].model.substring(1) +
                                      ' ' +
                                      vehicle[0].year}
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}

export default UserVehiclesModal;
