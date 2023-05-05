import fastify from 'fastify';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.S3_BUCKET);

const server = fastify();

server.get('/', async (request, reply) => {
    return { hello: 'world' };
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
