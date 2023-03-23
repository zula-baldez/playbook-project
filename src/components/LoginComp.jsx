import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import '../style/Login.css';

export function LoginComp() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        navigate('/play-field')
    };

    const handleSignup = () => {
        // TODO: Implement signup functionality using login and password
    };
    return (
        <div className="login-container">
        <div className="logo-wrapper">

            <div className="logo-container">
                <img src="logo.png"></img>
            </div>
        </div>
            <div className="auth-container">
               <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input type="login" id="login" value={login} onChange={handleLoginChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <button className="auth-btn login" onClick={handleLogin}>Login</button>
                <button className="auth-btn signup" onClick={handleSignup}>Signup</button>
            </div>
        </div>

    );

}