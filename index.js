// Vercel serverless function entry point
require('dotenv').config();
require('ts-node/register');
const app = require('./src/server').default;

module.exports = app;