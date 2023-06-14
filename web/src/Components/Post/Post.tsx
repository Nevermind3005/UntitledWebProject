import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { endpoints } from '../../api';
import { getAccessToken } from '../../token';
import { Post as PostType } from '../../Types/post';

const Post = () => {
    const [post, setPost] = useState<PostType>();
    const [loading, setLoading] = useState<boolean>(true);
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
                    setPost(data.data);
                    setLoading(false);
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

    return (
        <div className='bg-white py-24 sm:py-32'>
            {loading ? (
                <div>loading</div>
            ) : (
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl sm:text-center'>
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            {post?.title}
                        </h2>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            {post?.body}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
