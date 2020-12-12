import * as express from 'express';

function Logger(req: express.Request, res: express.Response, next: Function) {
    console.log(`${ req.method.toUpperCase() }`, `${ req.path }`);
    next();
}

export default Logger;
