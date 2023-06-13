import { Link } from 'react-router-dom';

interface IPostPreviewProps {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    createdAt: string;
}

const PostPreview: React.FC<IPostPreviewProps> = (post) => {
    return (
        <div>
            <Link to={`post/${post._id}`}>
                <li className='flex justify-between gap-x-6 py-5'>
                    <div className='flex gap-x-4'>
                        <Link to={`user/${post.authorId}`}>
                            <img
                                className='h-12 w-12 flex-none rounded-full bg-gray-50'
                                src={
                                    'https://img.icons8.com/?size=512&id=0PXqKKGn88m8&format=png'
                                }
                                alt=''
                            />
                        </Link>
                        <div className='min-w-0 flex-auto'>
                            <Link to={`user/${post.authorId}`}>
                                <p className='text-sm font-semibold leading-6 text-gray-900'>
                                    Author: {post.author}
                                </p>
                            </Link>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                                Title: {post.title}
                            </p>
                        </div>
                    </div>
                    <div className='hidden sm:flex sm:flex-col sm:items-end'>
                        <p className='mt-1 text-xs leading-5 text-gray-500'>
                            Created:{' '}
                            <time dateTime={post.createdAt}>
                                {post.createdAt}
                            </time>
                        </p>
                    </div>
                </li>
            </Link>
        </div>
    );
};

export default PostPreview;
