import session from 'express-session';
import { redisClient } from '../../config/redis';
const connectRedis = require('connect-redis');

const RedisStore = connectRedis(session);
export const sessionStore = new RedisStore({ client: redisClient });

export default session({
    store: sessionStore,
    secret: process.env.JWT_SECRET || 'mySecret',
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'lax'
    }
});
