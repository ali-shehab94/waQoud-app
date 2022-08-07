import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import { MdDelete } from 'react-icons/md';
import UserVehiclesModal from '../../components/UserVehiclesModal/UserVehiclesModal';

function AdminPanel() {
    let navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [remove, setRemove] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userVehicles, setUserVehicles] = useState();
    const [users, setUsers] = useState();
    const [vehicles, setVehicles] = useState();
    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        document.title = 'Admin Panel';
    });

    useEffect(() => {
        if (!remove) {
            getUsers();
            getVehicles();
        }
    }, [remove]);

    //get users from database and store in users variable
    const getUsers = async () => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/get_users',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    //get vehicles from database and store them in vehicles variable
    const getVehicles = async () => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/get_vehicles',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setVehicles(response.data.vehicles);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    const clearData = () => {
        setIsModalOpen(false);
    };

    //delete a user
    const deleteUser = async (id) => {
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/delete_user/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setUsers((_user) => _user.filter((users) => users.id !== id));
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    //get vehicles owned by a user
    const displayUserVehicles = async (id) => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/user_vehicles/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setUserVehicles(response.data.user_vehicles);
            })
            .catch((error) => {
                console.log('error', error.response.data);
            });
    };

    //delete a vehicle from database
    const deleteVehicle = async (id) => {
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/delete_vehicle/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setVehicles((_vehicles) => _vehicles.filter((vehicles) => vehicles.id !== id));
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
                                            openModal();
                                            displayUserVehicles(user.id);
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
            {isModalOpen && <UserVehiclesModal clearData={clearData} data={userVehicles} />}
        </div>
    );
}

export default AdminPanel;
