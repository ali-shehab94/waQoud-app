import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import { MdDeleteSweep } from 'react-icons/md';

function AdminPanel() {
    let navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState();
    const [vehicleId, setVehicleId] = useState();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const [users, setUsers] = useState();
    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        getUsers();
        getVehicles();
    }, [userId]);

    const getUsers = async () => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/get_users',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response.data.users);
                setUsers(response.data.users);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    const getVehicles = async () => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/get_vehicles',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response.data.vehicles);
                setVehicles(response.data.vehicles);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    useEffect(() => {
        if (userId) {
            deleteUser();
        }
    }, [userId]);

    useEffect(() => {
        if (vehicleId) {
            deleteVehicle();
        }
    }, [vehicleId]);

    const deleteUser = async () => {
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/delete_user/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    const deleteVehicle = async () => {
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/delete_vehicle/${vehicleId}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    return (
        <div className='admin-panel-container'>
            <Header text='Logout' onClick={handleLogout} />
            <div className='content-container'>
                <div className='admin-panel'>
                    <h1>Users</h1>
                    <div className='app'>
                        <div className='scroller'>
                            {users?.map((user) => (
                                <div className='user-item' key={user.id}>
                                    <p>{user.first_name + ' ' + user.last_name}</p>
                                    <span className='delete-icon'>
                                        <MdDeleteSweep
                                            onClick={() => {
                                                setUserId(user.id);
                                            }}
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='admin-panel'>
                    <h1>Vehicles</h1>
                    <div className='app'>
                        <div className='scroller'>
                            {vehicles?.map((vehicle) => (
                                <div className='vehicle-item' key={vehicle.id}>
                                    {vehicle.make.charAt(0).toUpperCase() + vehicle.make.substring(1) + ' ' + vehicle.model.charAt(0).toUpperCase() + vehicle.model.substring(1) + ' ' + vehicle.year}
                                    <span className='delete-icon'>
                                        <MdDeleteSweep
                                            onClick={() => {
                                                setVehicleId(vehicle.id);
                                            }}
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
