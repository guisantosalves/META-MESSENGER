import Redis from 'ioredis'

// ! -> make sure it's there
const redis = new Redis(process.env.REDIS_URL!) // opening connection

export default redis;