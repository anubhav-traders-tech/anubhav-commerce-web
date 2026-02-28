const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Ensure you have REDIS_URL or default to local redis
const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

const importQueue = new Queue('product-import', { connection });

module.exports = importQueue;
