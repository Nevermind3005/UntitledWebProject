import {
    ExclamationTriangleIcon,
    PhotoIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { endpoints } from '../../api';
import { getAccessToken, refreshToken } from '../../token';
import { User } from '../../Types/user';
import { Dialog } from '@headlessui/react';

const Settings = () => {
    const [user, setUser] = useState<User>({
        _id: '',
        username: '',
        email: '',
        role: '',
    });

    const navigate = useNavigate();

    const fetchDeleteUser = async () => {
        fetch(`${endpoints.user.delete}`, {
            method: 'DELETE',
            headers: { Authorization: getAccessToken() },
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(res);
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                navigate('/signin');
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                    // if (repeat === 0) {
                    //     refreshToken().then(() => {
                    //         fetchUser(1);
                    //     });
                    // } else {
                    //     navigate('/signin');
                    // }
                    console.log(err + 'error');
                });
        };
        fetchUser(0);
    }, []);

    return (
        <div>
            <form className='mt-6 flex items-center justify-center gap-x-6'>
                <div className='space-y-12'>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Settings
                    </h2>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='sm:col-span-4'>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Username
                            </label>
                            <div className='mt-2'>
                                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                                    <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
                                        user/
                                    </span>
                                    <input
                                        type='text'
                                        name='username'
                                        id='username'
                                        autoComplete='username'
                                        className='block flex-1 border-0 bg-transparent py-1.5 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                        value={user.username}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='sm:col-span-4'>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Email address
                        </label>
                        <div className='mt-2'>
                            <input
                                id='email'
                                value={user.email}
                                name='email'
                                type='email'
                                autoComplete='email'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className='mt-6 flex items-center justify-center gap-x-6'>
                <button
                    type='button'
                    className='text-sm font-semibold leading-6 text-gray-900'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Save
                </button>
            </div>
            <div className='mt-6 flex items-center justify-center gap-x-6'>
                <div className='transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                    <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                <ExclamationTriangleIcon
                                    className='h-6 w-6 text-red-600'
                                    aria-hidden='true'
                                />
                            </div>
                            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                <h3 className='text-base font-semibold leading-6 text-gray-900'>
                                    Deactivate account
                                </h3>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Are you sure you want to deactivate your
                                        account? All of your data will be
                                        permanently removed. This action cannot
                                        be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                            type='button'
                            onClick={() => fetchDeleteUser()}
                            className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                        >
                            Deactivate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
