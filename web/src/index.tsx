import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Posts from './Components/Posts/Posts';
import Post from './Components/Post/Post';
import User from './Components/User/User';
import { endpoints } from './api';
import Settings from './Components/Settings/Settings';
import CreatePost from './Components/CreatePost/CreatePost';
import UpdatePost from './Components/UpdatePost/UpdatePost';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Posts url={endpoints.post.get} />,
            },
            {
                path: '/post/:id',
                element: <Post />,
            },
            {
                path: '/user/:username',
                element: <User />,
            },
            {
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '/submit',
                element: <CreatePost />,
            },
            {
                path: 'update/:id',
                element: <UpdatePost />,
            },
        ],
    },
    {
        path: '/signin',
        element: <SignIn />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
