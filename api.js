// Vercel serverless function entry point - Production version
const app = require('./dist/server').default;

module.exports = app;