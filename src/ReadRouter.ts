'use strict';

import express from 'express';

import INumberData from './reader/INumberData';
import Config from './reader/Config';
import Reader from './reader/Reader';

const ReadRouter: express.Router = express.Router();

const NUMBER_QUERY_PARAM = 'number';
const SEPARATOR_QUERY_PARAM = 'separator';
const UNIT_QUERY_PARAM = 'unit';

ReadRouter.get('/read', (req: express.Request, res: express.Response) => {
    // Required params
    if (!req.query[NUMBER_QUERY_PARAM])
        return res.status(400).json({ error: 'Missing "number" parameter' });
    const numberStr: string = req.query[NUMBER_QUERY_PARAM].toString();

    // Modify global config
    if (req.query[SEPARATOR_QUERY_PARAM])
        Config.SEPARATOR = req.query[SEPARATOR_QUERY_PARAM].toString();
    if (req.query[UNIT_QUERY_PARAM])
        Config.UNIT = req.query[UNIT_QUERY_PARAM].toString();

    // Try parse to number data
    try {
        const numberData: INumberData = Reader.parseNumberData(numberStr);
        const result: string = Reader.readVietnameseNumber(numberData);
        return res.json({ text: result });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
});

export default ReadRouter;
