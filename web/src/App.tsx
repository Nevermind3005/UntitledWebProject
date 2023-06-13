import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { endpoints } from './api';
import { get } from 'http';
import { getAccessToken, refreshToken, setAccessToken } from './token';
import { Outlet, redirect, useNavigate } from 'react-router';
import { User } from './Types/user';
import Posts from './Components/Posts/Posts';

function App() {
    const [user, setUser] = useState<User>({
        _id: '',
        username: '',
        email: '',
        role: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async (repeat: number) => {
            fetch(`${endpoints.user.getMe}`, {
                method: 'GET',
                headers: { Authorization: getAccessToken() },
                redirect: 'follow',
            })
                .then((res) => {
                    if (!res.ok) {
                        return Promise.reject(res);
                    } else {
                        repeat = 0;
                        return res.json();
                    }
                })
                .then((data) => {
                    setUser(data.data);
                })
                .catch((err) => {
                    if (repeat === 0) {
                        refreshToken().then(() => {
                            fetchUser(1);
                        });
                    } else {
                        navigate('/signin');
                    }
                    console.log(err + 'error');
                });
        };
        fetchUser(0);
    }, []);

    return (
        <div className='App'>
            <Navbar user={user} />
            <Outlet />
        </div>
    );
}

export default App;
