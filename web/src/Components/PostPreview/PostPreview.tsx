import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../token';
import { endpoints } from '../../api';
import { Post } from '../../Types/post';

interface IPostPreviewProps {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    createdAt: string;
    meId: string;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostPreview: React.FC<IPostPreviewProps> = (post) => {
    const navigate = useNavigate();

    const deletePost = async (repeat: number) => {
        fetch(`${endpoints.post.delete}${post._id}`, {
            method: 'DELETE',
            headers: { Authorization: getAccessToken() },
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
                console.log(data);
                post.setPosts(
                    post.posts.filter((_post) => _post._id !== post._id)
                );
            })
            .catch((err) => {
                console.log(err + 'error');
            });
    };

    return (
        <div>
            <li className='flex justify-between gap-x-6 py-5'>
                <div className='flex gap-x-4'>
                    <Link to={`/user/${post.author}`}>
                        <img
                            className='h-12 w-12 flex-none rounded-full bg-gray-50'
                            src={
                                'https://img.icons8.com/?size=512&id=0PXqKKGn88m8&format=png'
                            }
                            alt=''
                        />
                    </Link>
                    <div className='min-w-0 flex-auto'>
                        <Link to={`/user/${post.author}`}>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                                Author: {post.author}
                            </p>
                        </Link>
                        <Link to={`/post/${post._id}`}>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                                Title: {post.title}
                            </p>
                        </Link>
                    </div>
                </div>
                <div className='hidden sm:flex sm:flex-col sm:items-end'>
                    <p className='mt-1 text-xs leading-5 text-gray-500'>
                        Created:{' '}
                        <time dateTime={post.createdAt}>{post.createdAt}</time>
                    </p>
                    {post.authorId === post.meId ? (
                        <div>
                            <button
                                type='button'
                                onClick={() => navigate(`/update/${post._id}`)}
                                className='inline-flex mr-1 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            >
                                <PencilIcon
                                    className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                                Edit
                            </button>
                            <button
                                onClick={() => deletePost(1)}
                                type='button'
                                className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            >
                                <TrashIcon
                                    className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                                Delete
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </li>
        </div>
    );
};

export default PostPreview;
