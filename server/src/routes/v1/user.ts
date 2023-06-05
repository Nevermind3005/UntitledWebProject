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
} from '../../handlers/userHandler';
import { authenticate } from '../../services/authService';

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
    fastify.get('/user/:username', userGetHandler);
    fastify.delete('/user/deactivate', userDeleteHandler);
    fastify.get('/user/me', { onRequest: [authenticate] }, userGetMeHandler);
    done();
};
