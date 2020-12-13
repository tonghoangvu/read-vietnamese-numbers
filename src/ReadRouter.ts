import * as express from 'express';

import INumberData from './INumberData';
import IReadConfig from './IReadConfig';
import Reader from './Reader';

const ReadRouter: express.Router = express.Router();

const NUMBER_QUERY_PARAM: string = 'number';
const SEPARATOR_QUERY_PARAM: string = 'separator';
const UNIT_QUERY_PARAM: string = 'unit';

const DEFAULT_SEPARATOR: string = ' ';
const DEFAULT_UNIT: string = 'đơn vị';

ReadRouter.get('/read', function (req: express.Request, res: express.Response) {
    // Read query params
    const paramNumber = req.query[NUMBER_QUERY_PARAM];
    const paramSeparator = req.query[SEPARATOR_QUERY_PARAM];
    const paramUnit = req.query[UNIT_QUERY_PARAM];

    // Required params
    if (!paramNumber)
        return res.end();
    const numberStr: string = paramNumber.toString();

    // Optional params (has default values)
    const separator: string = (paramSeparator)
        ? paramSeparator.toString() : DEFAULT_SEPARATOR;
    const unit: string = (paramUnit)
        ? paramUnit.toString() : DEFAULT_UNIT;

    // Try parse to number data
    let numberData: INumberData;
    try {
        numberData = Reader.parseNumberData(numberStr);

        // Build config
        const config: IReadConfig = { separator, unit };

        // Generate result
        const result: string = Reader.readVietnameseNumber(numberData, config);

        // Return JSON
        return res.json({ text: result });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
});

export default ReadRouter;
