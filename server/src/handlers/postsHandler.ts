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
    const tokenUser = request.user;
    const user = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: tokenUser.username });
    if (!user) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    const newPost = request.body;
    newPost.author = user.username;
    newPost.authorId = user._id;
    newPost.createdAt = new Date();
    const post = await request.server.mongo.db
        .collection('Posts')
        .insertOne(newPost);
    return { data: post };
};

export const postUpdateHandler = async (request: any, reply: any) => {
    const tokenUser = request.user;
    const user = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: tokenUser.username });
    if (!user) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    const { id } = request.params;
    const post = await request.server.mongo.db
        .collection('Posts')
        .findOne({ _id: new ObjectId(id) });
    if (!post) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    if (post.authorId.toString() !== user._id.toString()) {
        return reply.status(403).send({ data: { error: 'Forbidden' } });
    }
    const updatedPost = request.body;

    console.log(updatedPost);

    await request.server.mongo.db
        .collection('Posts')
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedPost });
    return { data: { message: 'Post updated' } };
};

export const postDeleteHandler = async (request: any, reply: any) => {
    const tokenUser = request.user;
    const user = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: tokenUser.username });
    if (!user) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    const { id } = request.params;
    const post = await request.server.mongo.db
        .collection('Posts')
        .findOne({ _id: new ObjectId(id) });
    if (!post) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    if (post.authorId.toString() !== user._id.toString()) {
        return reply.status(403).send({ data: { error: 'Forbidden' } });
    }
    await request.server.mongo.db
        .collection('Posts')
        .deleteOne({ _id: new ObjectId(id) });
    return { data: { message: 'Post deleted' } };
};
