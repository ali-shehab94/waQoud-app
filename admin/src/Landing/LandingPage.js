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
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
