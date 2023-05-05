import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import '../style/Login.css';

export function RegisterComp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const apiURL = 'http://localhost:8080/api/v1/auth'

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleFirstNameChange = (e) => {
        setFirstname(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastname(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
 

    const handlerRegister = () => {
        let res = fetch(apiURL + '/register', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'firstname': firstname,
                'lastname': lastname,
                'email': email,
                'password': password,
                'role' : 'USER'
            })
        }).then(res => {
                if (res.status == 200) {
                    localStorage['jwt-access'] = res.json().accessToken
                    localStorage['jwt-refresh'] = res.json().refreshToken
                    navigate('/play-field')
                } else {
                    alert(res.status)
                }
            }
        )
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
                    <label htmlFor="first-name">First name</label>
                    <input type="text" id="first-name" value={firstname} onChange={handleFirstNameChange}/>

                    <label htmlFor="last-name">Last name</label>
                    <input type="text" id="last-name" value={lastname} onChange={handleLastNameChange}/>

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={handleEmailChange}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange}/>

                </div>
                <button className="auth-btn login" onClick={handlerRegister}>Register</button>
            </div>
        </div>

    );

}