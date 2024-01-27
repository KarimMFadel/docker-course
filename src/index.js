const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// init app
const PORT = process.env.PORT || 4000;
const app = express();

// Redis client
// const REDIS_USER = 'root';
// const REDIS_PASS = 'example';
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

// const REDIS_URL = `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`
const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`

const redisClient = redis.createClient({
    url: REDIS_URL
});
redisClient.on('error', (err) => console.log('failed to connect to redis: ', err));
redisClient.on('connect', () => console.log('connect to redis...'));
redisClient.connect();

// Mongo DB
const DB_USER = 'root';
const DB_PASS = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';

const URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`

mongoose
    .connect(URL)
    .then(() => console.log('connect to db...'))
    .catch((err) => console.log('failed to connect to db: ', err));

app.get('/addData', (req, res) => {
    redisClient.set('products', 'products...')
    res.send('<h1>  hello Tornado! prod <h1>');
})

app.get('/Data', async (req, res) => {
    const products = await redisClient.get('products')
    res.send(`<h1>  hello Tornado! prod <h1>   <h2>${products}<h2>`);
})

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`))

