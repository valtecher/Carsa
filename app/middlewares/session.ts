const session = require('express-session')
const connectRedis = require('connect-redis')
const redisClient = require('../../config/redis')

const RedisStore = connectRedis(session);

module.exports = session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
        secure: false, // if true: only transmit cookie over https, TODO: Change for production
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 60, // 1 hour
        sameSite: 'lax',
    },
})