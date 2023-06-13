import { endpoints } from './api';

export const setAccessToken = (s: string) => {
    window.localStorage.setItem('accessToken', s);
};

export const getAccessToken = () => {
    return window.localStorage.getItem('accessToken') || '';
};

export const refreshToken = async () => {
    let res = await fetch(`${endpoints.auth.refreshToken}`, {
        method: 'POST',
        credentials: 'include',
    });
    let data = await res.json();
    setAccessToken(data.data.accessToken);
};
