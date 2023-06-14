import { useEffect, useState } from 'react';
import { endpoints } from '../../api';
import { getAccessToken, refreshToken } from '../../token';
import { useNavigate, useParams } from 'react-router';

const UpdatePost = () => {
    const [post, setPost] = useState({
        title: '',
        body: '',
    });

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const getPosts = async (repeat: number) => {
            fetch(`${endpoints.post.get}/${id}`, {
                method: 'GET',
                headers: { Authorization: getAccessToken() },
            })
                .then((res) => {
                    if (!res.ok) {
                        return Promise.reject(res);
                    } else {
                        repeat = 0;
                        return res;
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    setPost({ title: data.data.title, body: data.data.body });
                })
                .catch((err) => {
                    // if (repeat === 0) {
                    //     refreshToken().then(() => {
                    //         getPosts(1);
                    //     });
                    // } else {
                    //     navigate('/signin');
                    // }
                    // console.log(err + 'error');
                });
        };
        getPosts(0);
    }, []);

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        fetchPostPost(0);
        console.log(post);
    };

    const fetchPostPost = async (repeat: number) => {
        fetch(`${endpoints.post.post}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAccessToken(),
            },
            body: JSON.stringify(post),
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
                navigate('/');
            })
            .catch((err) => {
                // if (repeat === 0) {
                //     refreshToken().then(() => {
                //         fetchPostPost(1);
                //     });
                // } else {
                //     navigate('/signin');
                // }
                // console.log(err + 'error');
            });
    };

    return (
        <div className='isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div
                className='inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
                aria-hidden='true'
            ></div>
            <div className='mx-auto max-w-2xl text-center'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    Create post
                </h2>
            </div>
            <form className='mx-auto mt-16 max-w-xl sm:mt-20'>
                <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='title'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Title
                        </label>
                        <div className='mt-2.5'>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                onChange={(e) => {
                                    setPost({ ...post, title: e.target.value });
                                }}
                                value={post.title}
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='message'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Message
                        </label>
                        <div className='mt-2.5'>
                            <textarea
                                name='message'
                                id='message'
                                rows={4}
                                onChange={(e) => {
                                    setPost({ ...post, body: e.target.value });
                                }}
                                value={post.body}
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <button
                        type='submit'
                        onClick={(e) => handleSubmit(e)}
                        className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePost;
