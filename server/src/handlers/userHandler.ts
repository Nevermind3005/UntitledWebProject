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
    const { username } = request.params;
    const post = await request.server.mongo.db
        .collection('Users')
        .deleteOne({ username: username });
    if (!post) {
        return reply.status(404).send({ data: { error: 'Not Found' } });
    }
    reply.status(200).send({ data: post });
};
