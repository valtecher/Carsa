import session, { Session } from 'express-session';
import connectRedis from 'connect-redis';
import { redisClient } from '../../config/redis';

declare module 'express-session' {
    interface SessionData {
        person_id: string;
        email: string;
        valid: boolean;
    }
}

const RedisStore = connectRedis(session);
const sessionStore = new RedisStore({ client: redisClient });

export { sessionStore };

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
