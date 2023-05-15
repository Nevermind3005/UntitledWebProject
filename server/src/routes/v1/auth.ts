import { login, register } from '../../handlers/authHandler';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
    UserLoginDto,
    UserLoginDtoType,
    UserRegisterDto,
    UserRegisterDtoType,
} from '../../types/user';
module.exports = function (
    fastify: FastifyInstance<
        Server<typeof IncomingMessage, typeof ServerResponse>,
        IncomingMessage,
        ServerResponse<IncomingMessage>
    >,
    opts: any,
    done: () => void
) {
    fastify.post<{ Body: UserLoginDtoType }>(
        '/auth/login',
        {
            schema: {
                body: UserLoginDto,
            },
        },
        login
    );

    fastify.post<{ Body: UserRegisterDtoType }>(
        '/auth/register',
        {
            schema: {
                body: UserRegisterDto,
            },
        },
        register
    );

    done();
};
