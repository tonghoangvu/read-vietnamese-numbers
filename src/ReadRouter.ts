import * as express from 'express';

import INumberData from './INumberData';
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
        return res.end();
    const numberStr: string = paramNumber.toString();

    // Optional params
    const separator: string = (paramSeparator)
        ? paramSeparator.toString() : ' ';
    const unit: string = (paramUnit)
        ? paramUnit.toString() : 'đơn vị';
    const skipEmptyPart: boolean = (paramSkipEmptyPart)
        ? paramSkipEmptyPart == '1' : true;

    // Try parse to number data
    let numberData: INumberData;
    try {
        numberData = Reader.parseNumberData(numberStr);

        // Build config
        const config: IReadConfig = { separator, unit, skipEmptyPart };

        // Generate result
        const result: string = Reader.readVietnameseNumber(numberData, config);

        // Return JSON
        return res.json({ text: result });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
});

export default ReadRouter;
