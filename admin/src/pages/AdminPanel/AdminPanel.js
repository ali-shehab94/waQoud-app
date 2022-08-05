import React from 'react';
import Header from '../../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';

function AdminPanel() {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <Header text='Logout' onClick={handleLogout} />
        </div>
    );
}

export default AdminPanel;
