import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { userDeleteHandler, userGetHandler } from '../../handlers/userHandler';

module.exports = function (
    fastify: FastifyInstance<
        Server<typeof IncomingMessage, typeof ServerResponse>,
        IncomingMessage,
        ServerResponse<IncomingMessage>
    >,
    opts: any,
    done: () => void
) {
    fastify.get('/user/:username', userGetHandler);
    fastify.delete('/user/deactivate', userDeleteHandler);
    done();
};
