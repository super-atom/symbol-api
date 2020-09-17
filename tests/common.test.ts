import * as http from 'http';
import * as request from 'supertest';
import app from '../src/app';
import { db_server, setHeader } from './../jest.global';
import * as utils from '../src/utils/utils.index';

let app_server;
let db;

beforeAll(async done => {
    db = await db_server();
    app_server = http.createServer(app).listen('3003');
    done();
});

afterAll(async done => {
    app_server.close(done);
    db.close();
    done();
});

describe('Application initialization Test', () => {
    it('DB connection test', async (done) => {
        const res = await utils.dbConnectionCheck(db);
        expect(res).toBeTruthy();
        done();
    });

    it('Server connection test', async (done) => {
        const res = await request(app_server)
            .get('/')
            .set(setHeader);
        expect(res.status).toBe(200);
        done();
    });
});