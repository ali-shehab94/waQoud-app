import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import axios from 'axios';

function LandingPage() {
    const [isModalVisibile, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        if (isModalVisibile) {
            setIsModalVisible(false);
        } else {
            setIsModalVisible(true);
        }
    };
    let navigate = useNavigate();
    return (
        <div className='page-container'>
            <div className='nav-container'>
                <div className='nav-bar'>
                    <h3 className='nav-text'>Admin Login</h3>
                    <img src={require('../assets/logos/no-border.png')} className='nav-logo' />
                </div>
            </div>
            <div className='content-container'>
                <div className='waqoud-info'>
                    <h1>Welcome to waqoud.com</h1>
                    <p>waQoud is a utility app that calculates your trip costs and keeps you updated on the daily fluctuating gas prices.</p>
                </div>
                <div>
                    <img className='logo-main' src={require('../assets/logos/logo-main.png')} />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
