import { useState } from 'react';
import { token } from '../../token';
import { endpoints } from '../../api';

const SignIn = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const login = async () => {
        let response;
        try {
            response = await fetch(endpoints.auth.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
        } catch (error) {
            console.log(error);
        }
        if (response?.ok) {
            const data = await response.json();
            token.authToken = data.data.accessToken;
            setLoginData({ username: '', password: '' });
            console.log(token.authToken);
        }
    };

    const handleLogin = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        login();
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6'>
                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Username
                            </label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Username'
                                    autoComplete='section-userName'
                                    value={loginData.username}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            username: e.target.value,
                                        })
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Password
                                </label>
                                <div className='text-sm'>
                                    <a
                                        className='font-semibold text-indigo-600 hover:text-indigo-500'
                                        href='dsa'
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                    required={true}
                                    autoComplete='current-password'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            onClick={(e) => handleLogin(e)}
                        >
                            Sign in
                        </button>
                    </form>
                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Not a member?{' '}
                        <a
                            href={'/signup'}
                            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                        >
                            Join now
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignIn;
