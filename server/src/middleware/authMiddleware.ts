import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const fp = require('fastify-plugin');

module.exports = fp(async function (
    fastify: FastifyInstance<
        Server<typeof IncomingMessage, typeof ServerResponse>,
        IncomingMessage,
        ServerResponse<IncomingMessage>
    >,
    opts: any,
    done: () => void
) {
    fastify.decorate('authenticate', async function (request: any, reply: any) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
});
