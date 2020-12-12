import * as path from 'path';
import * as express from 'express';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';

import Logger from './Logger';
import ReadRouter from './ReadRouter';

const App = express();
dotenv.config();

// Security
App.disable('x-powered-by');
App.use(helmet());

// Logging
App.use(Logger);

// Routing for API
App.use(ReadRouter);

// Serve static files for demo
App.use(express.static(path.join(__dirname, '../demo')));

// Otherwise, Redirect to GitHub repository
const GITHUB_URL: string = 'https://github.com/tonghoangvu/read-vietnamese-numbers';
App.use(function (req: express.Request, res: express.Response) {
    res.redirect(GITHUB_URL);
});

// Start server
const PORT: number = parseInt(process.env.PORT) || 3000;
App.listen(PORT, function () {
    console.log(`Server is running at ${ PORT }`);
});
