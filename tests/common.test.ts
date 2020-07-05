import * as http from 'http';
import * as request from 'supertest';
import * as config from '../src/configs/config';
import app from '../src/app';
import { connection } from '../src/database/dbConnect';
import { setHeader } from './../jest.setup';
import * as mockup from './mockup';
import * as utils from '../src/utils/utils.index';

config;
let app_server;
let db_server;

beforeAll(async done => {
    db_server = connection;
    app_server = http.createServer(app);
    app_server.listen(config.app.server_port, done);
});

afterAll(async done => {
    app_server.close(done);
    db_server.close(done);
});

describe('Application initialization Test', () => {
    it('DB connection test', async () => {
        const res = await utils.dbConnectionCheck(db_server);
        expect(res).toBeTruthy();
    });

    it('Server connection test', async () => {
        const res = await request(app_server)
            .get('/')
            .set(setHeader);
        expect(res.status).toBe(200);
    });
});