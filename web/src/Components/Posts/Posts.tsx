import { useEffect, useState } from 'react';
import { Post } from '../../Types/post';
import { endpoints } from '../../api';
import PostPreview from '../PostPreview/PostPreview';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getAccessToken, refreshToken } from '../../token';
import { useNavigate } from 'react-router';

interface IPostsProps {
    url: string;
}

const Posts: React.FC<IPostsProps> = ({ url }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const getPosts = async (repeat: number) => {
            fetch(url, {
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
                    setPosts(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (repeat === 0) {
                        refreshToken().then(() => {
                            getPosts(1);
                        });
                    } else {
                        navigate('/signin');
                    }
                    console.log(err + 'error');
                });
        };
        getPosts(0);
    }, []);

    return (
        <div>
            <div className='flex justify-center'>
                <ul className='divide-y divide-gray-100 justify-center w-4/5'>
                    {loading ? (
                        <div>Loading</div>
                    ) : (
                        posts.map((post) => (
                            <PostPreview key={post._id} {...post} />
                        ))
                    )}
                </ul>
            </div>
            <div className='flex items-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6 justify-end'>
                <div>
                    <nav
                        className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                        aria-label='Pagination'
                    >
                        <p className='cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                        </p>
                        <p className='cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                        </p>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Posts;
