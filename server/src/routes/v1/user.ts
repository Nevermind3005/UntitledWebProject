import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import {
    userDeleteHandler,
    userGetHandler,
    userGetMeHandler,
} from '../../handlers/userHandler';

module.exports = function (fastify: any, opts: any, done: () => void) {
    fastify.get('/user/:username', userGetHandler);
    fastify.delete('/user/deactivate', userDeleteHandler);
    fastify.get(
        '/user/me',
        { onRequest: [fastify.authenticate] },
        userGetMeHandler
    );
    done();
};
