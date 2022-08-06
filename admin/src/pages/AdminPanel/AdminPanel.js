import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import { MdDeleteSweep } from 'react-icons/md';

function AdminPanel() {
    let navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const [users, setUsers] = useState();
    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        getUsers();
        getVehicles();
    }, []);

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
    const items = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Victor Wayne' },
        { id: 3, name: 'Jane Doe' },
        { id: 4, name: 'John Doe' },
        { id: 25, name: 'Victor Wayne' },
        { id: 34, name: 'Jane Doe' },
        { id: 14, name: 'John Doe' },
        { id: 24, name: 'Victor Wayne' },
        { id: 38, name: 'Jane Doe' },
        { id: 5, name: 'Jane Doe' },
        { id: 7, name: 'John Doe' },
        { id: 79, name: 'Victor Wayne' },
        { id: 77, name: 'Jane Doe' },
    ];

    return (
        <div className='admin-panel-container'>
            <Header text='Logout' onClick={handleLogout} />
            <div className='content-container'>
                <div className='admin-panel'>
                    <h1>Users</h1>
                    <div className='app'>
                        <div className='scroller'>
                            {users.map((user) => (
                                <div className='item' key={user.id}>
                                    {user.first_name + ' ' + user.last_name}{' '}
                                    <span className='delete-icon'>
                                        <MdDeleteSweep />
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
                            {vehicles.map((vehicle) => (
                                <div className='item' key={vehicle.id}>
                                    {vehicle.make + ' ' + vehicle.model + ' ' + vehicle.year}
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
