import { useEffect, useState } from 'react';
import { Post } from '../../Types/post';
import { endpoints } from '../../api';
import PostPreview from '../PostPreview/PostPreview';

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const getPosts = async () => {
            fetch(endpoints.post.get)
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data.data);
                    setLoading(false);
                });
        };
        getPosts();
    }, []);

    return (
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
    );
};

export default Posts;
