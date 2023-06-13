import { Static, Type } from '@sinclair/typebox';
import { RefreshToken } from './token';

export const UserLoginDto = Type.Object({
    username: Type.String({ minLength: 3, maxLength: 20 }),
    password: Type.String({ minLength: 8, maxLength: 64 }),
});

export const UserRegisterDto = Type.Object({
    username: Type.String({ minLength: 3, maxLength: 20 }),
    password: Type.String({ minLength: 8, maxLength: 64 }),
    email: Type.String({ format: 'email' }),
});

export const UserGet = Type.Object({
    _id: Type.String({ format: 'ObjectId' }),
    username: Type.String({ minLength: 3, maxLength: 20 }),
    role: Type.String(),
});

export const UserGetDto = Type.Object({
    data: UserGet,
});

export const UserGetMe = Type.Object({
    _id: Type.String({ format: 'ObjectId' }),
    username: Type.String({ minLength: 3, maxLength: 20 }),
    email: Type.String({ format: 'email' }),
    role: Type.String(),
});

export const UserGetMeDto = Type.Object({
    data: UserGetMe,
});

export const UserDeactivateDto = Type.Object({
    password: Type.String({ minLength: 8, maxLength: 64 }),
    accessToken: Type.String(),
});

export type UserGetDtoType = Static<typeof UserGetDto>;
export type UserGetMeDtoType = Static<typeof UserGetMeDto>;
export type UserLoginDtoType = Static<typeof UserLoginDto>;
export type UserRegisterDtoType = Static<typeof UserRegisterDto>;

export type User = {
    _id: string;
    username: string;
    password: string;
    email: string;
    refreshTokens: RefreshToken[];
    role: string;
};
