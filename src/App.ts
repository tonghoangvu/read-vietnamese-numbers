'use strict';

import path from 'path';
import core from 'express-serve-static-core';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

import Logger from './Logger';
import ReadRouter from './ReadRouter';

// Init
const App: core.Express = express();
dotenv.config();

// Security
App.disable('x-powered-by');
App.use(helmet({
    contentSecurityPolicy: false  // Disable auto-upgrade insecure request
}));

// Logging
App.use(Logger);

// Routing for API
App.use(ReadRouter);

// Serve static files for demo
App.use(express.static(path.join(__dirname, '..', 'demo')));

export { App };
