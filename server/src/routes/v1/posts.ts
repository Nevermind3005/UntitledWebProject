import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import {
    postsGetHandler,
    postPostHandler,
    postDeleteHandler,
    postUpdateHandler,
} from '../../handlers/postsHandler';
import {
    PostPostDto,
    PostsGetDto,
    PostsGetDtoType,
    PostGetDtoType,
    PostGetDto,
} from '../../types/post';
import { authenticate } from '../../services/authService';

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
            onRequest: [authenticate],
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
            onRequest: [authenticate],
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
            onRequest: [authenticate],
            schema: {
                body: {
                    type: 'object',
                    properties: PostPostDto.properties,
                },
            },
        },
        postPostHandler
    );
    fastify.delete(
        '/posts/:id',
        {
            onRequest: [authenticate],
        },
        postDeleteHandler
    );

    fastify.put(
        '/posts/:id',
        {
            onRequest: [authenticate],
        },
        postUpdateHandler
    );

    done();
};
