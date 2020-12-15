import * as express from 'express';

import INumberData from './reader/INumberData';
import Config from './reader/Config';
import Reader from './reader/Reader';

const ReadRouter: express.Router = express.Router();

const NUMBER_QUERY_PARAM: string = 'number';
const SEPARATOR_QUERY_PARAM: string = 'separator';
const UNIT_QUERY_PARAM: string = 'unit';

ReadRouter.get('/read', function (req: express.Request, res: express.Response) {
    // Read query params
    const paramNumber: any = req.query[NUMBER_QUERY_PARAM];
    const paramSeparator: any = req.query[SEPARATOR_QUERY_PARAM];
    const paramUnit: any = req.query[UNIT_QUERY_PARAM];

    // Required params
    if (!paramNumber)
        return res.end();
    const numberStr: string = paramNumber.toString();

    // Modify global config
    if (paramSeparator)
        Config.SEPARATOR = paramSeparator.toString();
    if (paramUnit)
        Config.UNIT = paramUnit.toString();

    // Try parse to number data
    let numberData: INumberData;
    try {
        numberData = Reader.parseNumberData(numberStr);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }

    // Generate result
    const result: string = Reader.readVietnameseNumber(numberData);

    // Return JSON
    return res.json({ text: result });
});

export default ReadRouter;
