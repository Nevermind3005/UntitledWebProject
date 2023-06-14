import bcrypt from 'bcrypt';
import * as authService from '../services/authService';
import { User } from '../types/user';

const saltRounds = 10;

//TODO: Refactor login
export const login = async (request: any, reply: any) => {
    const { username, password } = request.body;
    const dbUser: User = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: username });

    if (!dbUser) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    const result = bcrypt.compareSync(password, dbUser.password);

    if (!result) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    const token = await authService.generateJWT(reply, dbUser);

    const refreshToken = authService.generateRefreshToken(reply, dbUser);

    request.server.mongo.db
        .collection('Users')
        .updateOne(
            { _id: dbUser._id },
            { $push: { refreshTokens: refreshToken } }
        );

    return reply
        .setCookie('refreshToken', refreshToken.token, {
            path: '/api/v1/auth/',
            httpOnly: true,
            expires: refreshToken.expiresAt,
            signed: true,
            sameSite: 'none',
        })
        .status(200)
        .send({ data: { accessToken: `Bearer ${token}` } });
};

export const register = (request: any, reply: any) => {
    const { username, password, email } = request.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return reply
                .status(500)
                .send({ data: { error: 'Internal Server Error' } });
        }
        const dbUser = await request.server.mongo.db
            .collection('Users')
            .find({ $or: [{ username: username }, { email: email }] })
            .toArray();
        if (dbUser.length > 0) {
            return reply
                .status(409)
                .send({ data: { error: 'User already exists' } });
        }
        request.server.mongo.db.collection('Users').insertOne({
            username: username,
            password: hash,
            email: email,
            role: 'user',
        });
        return reply.status(201).send({ data: { status: 'Created' } });
    });
};

//TODO: Refactor logout
export const logout = async (request: any, reply: any) => {
    //Get cookie
    const signedCookieRefreshToken = request.cookies.refreshToken;

    //Check if cookie exists
    if (!signedCookieRefreshToken) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    //Unsign cookie
    const cookieRefreshToken = request.unsignCookie(
        request.cookies.refreshToken
    );

    //Set token to revoked
    let a = await request.server.mongo.db
        .collection('Users')
        .updateOne(
            { 'refreshTokens.token': cookieRefreshToken.value },
            { $set: { 'refreshTokens.$.revoked': new Date() } }
        );

    //Clear cookie
    return reply
        .clearCookie('refreshToken', { path: '/api/v1/auth/' })
        .status(200)
        .send();
};

//TODO: Refactor refresh
export const refresh = async (request: any, reply: any) => {
    //Get cookie
    const signedCookieRefreshToken = request.cookies.refreshToken;

    //Check if cookie exists
    if (!signedCookieRefreshToken) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    //Unsign cookie
    const cookieRefreshToken = request.unsignCookie(
        request.cookies.refreshToken
    );

    console.log(cookieRefreshToken);

    //Get user from db
    const dbUser = await request.server.mongo.db.collection('Users').findOne({
        refreshTokens: {
            $elemMatch: {
                token: cookieRefreshToken.value,
                revoked: null,
                expiresAt: { $gt: new Date() },
            },
        },
    });

    if (!dbUser) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    //console.log(dbUser);

    //Set token to revoked
    let a = await request.server.mongo.db
        .collection('Users')
        .updateOne(
            { 'refreshTokens.token': cookieRefreshToken.value },
            { $set: { 'refreshTokens.$.revoked': new Date() } }
        );

    const token = await authService.generateJWT(reply, dbUser);

    const refreshToken = authService.generateRefreshToken(reply, dbUser);

    request.server.mongo.db
        .collection('Users')
        .updateOne(
            { _id: dbUser._id },
            { $push: { refreshTokens: refreshToken } }
        );

    return reply
        .setCookie('refreshToken', refreshToken.token, {
            path: '/api/v1/auth/',
            httpOnly: true,
            expires: refreshToken.expiresAt,
            signed: true,
            sameSite: 'none',
        })
        .status(200)
        .send({ data: { accessToken: `Bearer ${token}` } });
};
