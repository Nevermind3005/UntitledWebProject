import { useParams } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { endpoints } from '../../api';

const User = () => {
    const { username } = useParams();
    return (
        <div>
            <Posts url={`${endpoints.user.get}/${username}/posts`} />
        </div>
    );
};

export default User;
