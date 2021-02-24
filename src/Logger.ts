'use strict';

import express from 'express';

function Logger(req: express.Request, res: express.Response, next: () => void): void {
    console.log(req.method.toUpperCase(), ':', req.path);
    next();
}

export default Logger;
