import * as express from 'express';

import IReadConfig from './IReadConfig';
import Reader from './Reader';

const ReadRouter: express.Router = express.Router();

ReadRouter.get('/read', function (req: express.Request, res: express.Response) {
    const paramNumber = req.query['number'];
    const paramSeparator = req.query['separator'];
    const paramUnit = req.query['unit'];
    const paramSkipEmptyPart = req.query['skip-empty-part'];

    // Required params
    if (!paramNumber)
        res.end();
    const number: number = parseInt(paramNumber.toString());

    // Optional params
    const separator: string = (paramSeparator)
        ? paramSeparator.toString() : ' ';
    const unit: string = (paramUnit)
        ? paramUnit.toString() : 'đơn vị';
    const skipEmptyPart = (paramSkipEmptyPart)
        ? paramSkipEmptyPart == '1' : true;
    
    // Build config
    const config: IReadConfig = { separator, unit, skipEmptyPart };
    const result: string = Reader.readVietnameseNumbers(number, config);

    // Return JSON
    res.json({ result });
});

export default ReadRouter;