export const userGetHandler = async (request: any, reply: any) => {
    const { username } = request.params;
    const post = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: username });
    if (!post) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    reply.status(200).send({ data: post });
};

//TODO edit
export const userDeleteHandler = async (request: any, reply: any) => {
    const { username } = request.user;

    const user = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: username });

    console.log(user);

    if (!user) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }

    await request.server.mongo.db
        .collection('Posts')
        .deleteMany({ author: username });
    await request.server.mongo.db
        .collection('Users')
        .deleteOne({ username: username });

    reply.status(200).send({ data: 'ok' });
};

export const userGetMeHandler = async (request: any, reply: any) => {
    const tokenUser = request.user;
    const post = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: tokenUser.username });
    if (!post) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    reply.status(200).send({ data: post });
};

export const userGetPostsHandler = async (request: any, reply: any) => {
    const { username } = request.params;
    const limit = parseInt(request.query.limit) || 25;
    const skip = parseInt(request.query.skip) || 0;

    const posts = await request.server.mongo.db
        .collection('Posts')
        .find({ author: username })
        .limit(limit)
        .skip(skip)
        .toArray();
    if (!posts) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    return reply.status(200).send({ data: posts });
};
