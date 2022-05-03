import { createClient } from 'redis';

export const redisClient = createClient({
    port: 6379,
    host: 'localhost'
});
