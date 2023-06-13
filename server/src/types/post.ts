import { Static, Type } from '@sinclair/typebox';

export const PostGet = Type.Object({
    _id: Type.String({ format: 'ObjectId' }),
    title: Type.String({ minLength: 1, maxLength: 255 }),
    body: Type.String({ minLength: 1, maxLength: 1024 }),
    author: Type.String({ minLength: 3, maxLength: 20 }),
    authorId: Type.String({ format: 'ObjectId' }),
    createdAt: Type.String({ format: 'date-time' }),
});

export const PostPostDto = Type.Object({
    title: Type.String({ minLength: 1, maxLength: 255 }),
    body: Type.String({ minLength: 1, maxLength: 1024 }),
});

export const PostsGetDto = Type.Object({
    data: Type.Array(PostGet),
});

export const PostGetDto = Type.Object({
    data: PostGet,
});

export type PostGetDtoType = Static<typeof PostGetDto>;
export type PostsGetDtoType = Static<typeof PostsGetDto>;
export type PostPostDtoType = Static<typeof PostPostDto>;
