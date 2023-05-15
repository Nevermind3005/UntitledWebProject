import bcrypt from 'bcrypt';

const saltRounds = 10;

export const login = async (request: any, reply: any) => {
    const { username, password } = request.body;
    const dbUser = await request.server.mongo.db
        .collection('Users')
        .findOne({ username: username });

    if (!dbUser) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    const result = bcrypt.compareSync(password, dbUser.password);

    if (!result) {
        return reply.status(401).send({ data: { error: 'Unauthorized' } });
    }

    const token = await reply.jwtSign({
        username: dbUser.username,
        role: ['admin'],
        expiresIn: '2h',
    });
    return reply.status(200).send({ data: { accessToken: `Bearer ${token}` } });
};

export const register = (request: any, reply: any) => {
    const { username, password, email } = request.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return reply
                .status(500)
                .send({ data: { error: 'Internal Server Error' } });
        }
        const dbUser = await request.server.mongo.db
            .collection('Users')
            .find({ $or: [{ username: username }, { email: email }] })
            .toArray();
        if (dbUser.length > 0) {
            return reply
                .status(409)
                .send({ data: { error: 'User already exists' } });
        }
        request.server.mongo.db.collection('Users').insertOne({
            username: username,
            password: hash,
            email: email,
        });
        return reply.status(201).send({ data: { status: 'Created' } });
    });
};
