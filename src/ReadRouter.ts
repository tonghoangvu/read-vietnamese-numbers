import * as express from 'express';

import INumberData from './reader/INumberData';
import Config from './reader/Config';
import Reader from './reader/Reader';

const ReadRouter: express.Router = express.Router();

const NUMBER_QUERY_PARAM = 'number';
const SEPARATOR_QUERY_PARAM = 'separator';
const UNIT_QUERY_PARAM = 'unit';

ReadRouter.get('/read', function (req: express.Request, res: express.Response) {
    // Required params
    if (!req.query[NUMBER_QUERY_PARAM])
        return res.end();
    const numberStr: string = req.query[NUMBER_QUERY_PARAM].toString();

    // Modify global config
    if (req.query[SEPARATOR_QUERY_PARAM])
        Config.SEPARATOR = req.query[SEPARATOR_QUERY_PARAM].toString();
    if (req.query[UNIT_QUERY_PARAM])
        Config.UNIT = req.query[UNIT_QUERY_PARAM].toString();

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
