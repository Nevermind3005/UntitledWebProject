import { ObjectId } from '@fastify/mongodb';

export const postsGetHandler = async (request: any, reply: any) => {
    const { id } = request.params;
    if (!id) {
        const limit = parseInt(request.query.limit) || 25;
        const skip = parseInt(request.query.skip) || 0;
        const posts = await request.server.mongo.db
            .collection('Posts')
            .find({})
            .limit(limit)
            .skip(skip)
            .toArray();
        reply.status(200).send({ data: posts });
    } else {
        const post = await request.server.mongo.db
            .collection('Posts')
            .findOne({ _id: new ObjectId(id) });
        if (!post) {
            return reply.status(404).send({ data: { error: 'Not Found' } });
        }
        reply.status(200).send({ data: post });
    }
};

export const postPostHandler = async (request: any, reply: any) => {
    const post = await request.server.mongo.db
        .collection('Posts')
        .insertOne(request.body);
    return { data: post };
};

export const questionsDeleteHandler = async (request: any, reply: any) => {};