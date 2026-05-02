import express from 'express';
import { createServer } from 'http';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || process.env.SERVER_PORT || 0;





export { app, server, PORT };