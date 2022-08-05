import React from 'react';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        axios({
            method: 'POST',
            url: 'jdjnsjdcn',
            headers: { 'content-type': 'multipart/form-data' },
        })
            .then((response) => {
                if (response.data.user_type === 'admin') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('name', response.data.user_name);
                    navigate('/Main');
                } else {
                    alert('User is not an admin');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='container'>
            <div className='page-container'>
                <Header
                    text='Login'
                    onClick={() => {
                        navigate('/login');
                    }}
                />
                <div className='content-container'>
                    <div className='sign-in-container'>
                        <div className='sign-in-card'>
                            <div className='input-form'>
                                <h1>Sign In</h1>
                                <input onChange={(e) => setEmail(e.target.value)} className='input' placeholder='email' />
                                <input onChange={(e) => setPassword(e.target.value)} className='input' placeholder='password' type={'password'} />
                            </div>
                            <button className='submit'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
