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
        console.log('pressed');
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login`, JSON.stringify({ email, password }), {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true,
            });
            console.log(response.data.authorization.token);
            console.log(response.data.user.first_name);
            localStorage.setItem('token', response.data.authorization.token);
            localStorage.setItem('name', response.data.user.first_name);
            navigate('BottomTab');
        } catch (error) {
            console.log(error);
        }
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
                            <button className='submit' onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
