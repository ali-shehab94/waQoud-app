import React from 'react';
import Header from '../../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
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
        { id: 34, name: 'Jane Doe' },
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
                            {items.map((item) => (
                                <div className='item' key={item.id}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='admin-panel'>
                    <h1>Vehicles</h1>
                    <div className='app'>
                        <div className='scroller'>
                            {items.map((item) => (
                                <div className='item' key={item.id}>
                                    {item.name}
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
