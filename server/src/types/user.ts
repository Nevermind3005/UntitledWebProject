import { Static, Type } from '@sinclair/typebox';

export const UserLoginDto = Type.Object({
    username: Type.String({ minLength: 3, maxLength: 20 }),
    password: Type.String({ minLength: 8, maxLength: 64 }),
});

export const UserRegisterDto = Type.Object({
    username: Type.String({ minLength: 3, maxLength: 20 }),
    password: Type.String({ minLength: 8, maxLength: 64 }),
    email: Type.String({ format: 'email' }),
});

export const UserDeactivateDto = Type.Object({
    password: Type.String({ minLength: 8, maxLength: 64 }),
    accessToken: Type.String(),
});

export type UserLoginDtoType = Static<typeof UserLoginDto>;
export type UserRegisterDtoType = Static<typeof UserRegisterDto>;
