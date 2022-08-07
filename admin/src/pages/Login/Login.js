import React from 'react';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    useEffect(() => {
        document.title = 'Login';
    });
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        email: email,
        password: password,
    };

    const handleLogin = async () => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/login',
            data: data,
            password,
            headers: { 'content-type': 'multipart/form-data' },
        })
            .then((response) => {
                if (response.data.user.user_type === 'admin') {
                    localStorage.setItem('token', response.data.authorization.token);
                    localStorage.setItem('name', response.data.user.user_name);
                    navigate('/admin_panel');
                } else {
                    alert('user is not an admin');
                }
            })
            .catch((error) => {
                console.log('error', error);
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
                                <input onChange={(e) => setEmail(e.target.value)} className='input' placeholder='Email' />
                                <input onChange={(e) => setPassword(e.target.value)} className='input' placeholder='Password' type={'password'} />
                                <button className='submit' onClick={handleLogin}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
