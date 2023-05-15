import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { postsGetHandler, postPostHandler } from '../../handlers/postsHandler';
import {
    PostGet,
    PostPostDto,
    PostsGetDto,
    PostsGetDtoType,
    PostGetDtoType,
    PostGetDto,
} from '../../types/post';

module.exports = function (
    fastify: FastifyInstance<
        Server<typeof IncomingMessage, typeof ServerResponse>,
        IncomingMessage,
        ServerResponse<IncomingMessage>
    >,
    opts: any,
    done: () => void
) {
    fastify.get<{ Reply: PostsGetDtoType }>(
        '/posts',
        {
            schema: {
                response: {
                    200: PostsGetDto,
                },
            },
        },
        postsGetHandler
    );

    fastify.get<{ Reply: PostGetDtoType }>(
        '/posts/:id',
        {
            schema: {
                response: {
                    200: PostGetDto,
                },
            },
        },
        postsGetHandler
    );

    fastify.post(
        '/posts',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: PostPostDto.properties,
                },
            },
        },
        postPostHandler
    );

    done();
};