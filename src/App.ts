import * as express from 'express';
import * as helmet from 'helmet';

import Logger from './Logger';
import ReadRouter from './ReadRouter';

const App = express();

// Security
App.disable('x-powered-by');
App.use(helmet());

// Logging
App.use(Logger);

// Routing for API
App.use(ReadRouter);

// Redirect other requests to GitHub repository
const GITHUB_URL = 'https://github.com/tonghoangvu/read-vietnamese-numbers';
App.use(function (req, res) {
    res.redirect(GITHUB_URL);
});

const PORT = 3000;
App.listen(PORT, function () {
    console.log(`Server is running at ${ PORT }`);
});