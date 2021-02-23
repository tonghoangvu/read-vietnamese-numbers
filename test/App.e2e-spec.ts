import request from 'supertest';
import { App } from '../src/App';
import http from 'http';
import INumberData from '../src/reader/INumberData';
import Reader from '../src/reader/Reader';

const app = request(App);

describe('Test Server Response',  () => {
    let server: http.Server;
    beforeAll(async() => {
        server = App.listen(3000);
    });
    test('(GET /read without params) It should reject the request', async (done) => {
        const response = await app.get('/read');
        expect(response.statusCode).toBe(400);
        expect(typeof response.body).toBe('object');
        expect(typeof response.body.error).toBe('string');
        expect(response.body.error).toBe('Missing "number" parameter');
        done();
    });
    test('(GET /read) It should response the GET method', async (done) => {
        const response = await app.get('/read').query({ number: -12345 });
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(typeof response.body.text).toBe('string');
        expect(response.body.text).toBe('âm mười hai nghìn ba trăm bốn mươi lăm đơn vị');
        done();
    });
    afterAll(async () => {
        server.close();
    });
});

describe('Test Reader',  () => {
    test('It should return correct value', async (done) => {
        const cases = [
            [1, 'một đơn vị'],
            [10, 'mười đơn vị'],
            [11, 'mười một đơn vị'],
            [15, 'mười lăm đơn vị'],
            [100, 'một trăm đơn vị'],
            [101, 'một trăm lẻ một đơn vị'],
            [111, 'một trăm mười một đơn vị'],
            [150, 'một trăm năm mươi đơn vị'],
            [1000, 'một nghìn đơn vị'],
            [1001, 'một nghìn không trăm lẻ một đơn vị'],
            [1005, 'một nghìn không trăm lẻ năm đơn vị'],
            [1015, 'một nghìn không trăm mười lăm đơn vị'],
            [1100, 'một nghìn một trăm đơn vị'],
            [1115, 'một nghìn một trăm mười lăm đơn vị'],
            [10005, 'mười nghìn không trăm lẻ năm đơn vị'],
            [15005, 'mười lăm nghìn không trăm lẻ năm đơn vị'],
            [1000000, 'một triệu đơn vị'],
            [1000000000, 'một tỉ đơn vị'],
            [155555555505, 'một trăm năm mươi lăm tỉ năm trăm năm mươi lăm triệu năm trăm năm mươi lăm nghìn năm trăm lẻ năm đơn vị']

        ];
        for (const item of cases){
            const numberData: INumberData = Reader.parseNumberData(item[0].toString());
            const result: string = Reader.readVietnameseNumber(numberData);
            expect(result).toBe(item[1]);
        }
        done();
    });
});

