import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import axios from 'axios';

function LandingPage() {
    let navigate = useNavigate();
    return (
        <div>
            <div className='nav-container'>
                <div>
                    <h3>Im an admin</h3>
                    <img src={require('../assets/logos/no-border.png')} />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
