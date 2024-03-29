import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Alert, Snackbar} from '@mui/material';

import '../style/Login.css';

export function LoginComp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const apiURL = 'http://localhost:8080/api/v1/auth'

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        let res = fetch(apiURL + '/authenticate', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
            })
        }).then(res => {
                if (res.status == 200) {
                    localStorage['jwt-access'] = res.json().accessToken
                    localStorage['jwt-refresh'] = res.json().refreshToken
                    navigate('/play-field')
                } else {
                    setOpen(true)
                }
            }
        )
    };
    const handleClose = () => {
        setOpen(false)
    }
    const handleSignup = () => {
        navigate('/register')

    };
    return (

        <div className="login-container">
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Wrong login or password!
                </Alert>

            </Snackbar>
            <div className="logo-wrapper">

                <div className="logo-container">
                    <img src="logo.png"></img>
                </div>
            </div>
            <div className="auth-container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange}/>
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