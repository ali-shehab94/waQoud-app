import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Header from '../../components/Header';
import Login from '../Login/Login';
import axios from 'axios';

function LandingPage() {
    let navigate = useNavigate();
    return (
        <div className='page-container'>
            <Header
                text='Admin Login'
                onClick={() => {
                    navigate('/login');
                }}
            />
            <div className='content-container'>
                <div className='waqoud-info'>
                    <h1>Always know your trip costs</h1>
                    <p>waQoud is a utility app that calculates your trip costs and keeps you updated on the daily fluctuating gas prices.</p>
                </div>
                <div>
                    <img className='logo-main' src={require('../../assets/logos/logo-main.png')} />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
