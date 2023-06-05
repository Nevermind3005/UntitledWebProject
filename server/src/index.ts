import fastify from 'fastify';
import pino from 'pino';
import dotenv from 'dotenv';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

dotenv.config();
const port: number = parseInt(process.env.PORT || '8080');
const mongodbUrl: string = process.env.MONGODB_URL || '';

const server = fastify({
    logger: pino({ level: 'info' }),
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: mongodbUrl,
});

server.register(require('@fastify/cookie'), {
    secret: process.env.COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {},
});

server.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET,
});

server.register(require('./middleware/authMiddleware'));

server.register(require('./routes/v1/posts'), { prefix: '/api/v1' });
server.register(require('./routes/v1/auth'), { prefix: '/api/v1' });
server.register(require('./routes/v1/user'), { prefix: '/api/v1' });

server.listen({ port: port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at  ${address}`);
});
