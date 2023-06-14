import {
    FastifyBaseLogger,
    FastifyInstance,
    FastifyTypeProviderDefault,
    RawServerDefault,
} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import {
    userDeleteHandler,
    userGetHandler,
    userGetMeHandler,
    userGetPostsHandler,
} from '../../handlers/userHandler';
import { authenticate } from '../../services/authService';
import { PostsGetDto, PostsGetDtoType } from '../../types/post';
import {
    UserGetDto,
    UserGetDtoType,
    UserGetMeDto,
    UserGetMeDtoType,
} from '../../types/user';

module.exports = function (
    fastify: FastifyInstance<
        RawServerDefault,
        IncomingMessage,
        ServerResponse<IncomingMessage>,
        FastifyBaseLogger,
        FastifyTypeProviderDefault
    >,
    opts: any,
    done: () => void
) {
    fastify.get<{ Reply: UserGetDtoType }>(
        '/user/:username',
        {
            onRequest: [authenticate],
            schema: {
                response: {
                    200: UserGetDto,
                },
            },
        },
        userGetHandler
    );
    fastify.delete('/user', { onRequest: [authenticate] }, userDeleteHandler);
    fastify.get<{ Reply: UserGetMeDtoType }>(
        '/user/me',
        {
            onRequest: [authenticate],
            schema: {
                response: {
                    200: UserGetMeDto,
                },
            },
        },
        userGetMeHandler
    );
    fastify.get<{ Reply: PostsGetDtoType }>(
        '/user/:username/posts',
        {
            onRequest: [authenticate],
            schema: {
                response: {
                    200: PostsGetDto,
                },
            },
        },
        userGetPostsHandler
    );
    done();
};
