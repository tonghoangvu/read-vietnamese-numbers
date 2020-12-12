import * as express from 'express';

function Logger(request: express.Request, response: express.Response, next) {
    console.log(`${ request.method.toUpperCase() }`, `${ request.path }`);
    next();
}

export default Logger;
