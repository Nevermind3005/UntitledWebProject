import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from '../types/token';
import { User } from '../types/user';

export const generateJWT = async (reply: any, user: User) => {
    const token = await reply.jwtSign(
        {
            username: user.username,
            role: user.role || 'user',
        },
        { expiresIn: '2m' }
    );
    return token;
};

export const generateRefreshToken = (reply: any, user: User): RefreshToken => {
    const refreshToken = {
        token: uuidv4(),
        createdAt: new Date(),
        // 7 days
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        revoked: null,
    };
    return refreshToken;
};
