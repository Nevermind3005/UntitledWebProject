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

export const UserGetDto = Type.Object({
    _id: Type.String(),
    username: Type.String({ minLength: 3, maxLength: 20 }),
});

export const UserDeactivateDto = Type.Object({
    password: Type.String({ minLength: 8, maxLength: 64 }),
    accessToken: Type.String(),
});

export type UserGetDtoType = Static<typeof UserGetDto>;
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
