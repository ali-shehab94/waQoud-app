import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import { MdDelete } from 'react-icons/md';

function AdminPanel() {
    let navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState();
    const [vehicleId, setVehicleId] = useState();
    const [remove, setRemove] = useState(false);
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const [users, setUsers] = useState();
    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        if (!remove) {
            getUsers();
            getVehicles();
        }
    }, [remove]);

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

    // useEffect(() => {
    //     if (userId) {
    //         deleteUser();
    //     }
    // }, []);

    // useEffect(() => {
    //     if (vehicleId) {
    //         deleteVehicle();
    //     }
    // }, []);

    const deleteUser = async (id) => {
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/delete_user/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response.data);
                setRemove(false);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    const displayVehicles = async (id) => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/user_vehicles/${id}`,
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
                setRemove(false);
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
                                    <p
                                        onClick={() => {
                                            displayVehicles(user.id);
                                        }}
                                    >
                                        {user.first_name + ' ' + user.last_name}
                                    </p>
                                    <span className='delete-icon'>
                                        <MdDelete
                                            onClick={() => {
                                                deleteUser(user.id);
                                            }}
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='count-box'>
                        <h1>Count: {users?.length}</h1>
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
                                        <MdDelete
                                            onClick={() => {
                                                deleteVehicle(vehicle.id);
                                            }}
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='count-box'>
                        <h1>Count: {vehicles?.length}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
