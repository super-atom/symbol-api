import * as http from 'http';
import * as request from 'supertest';
import app from '../src/app';
import { db_server, setHeader } from './../jest.global';
// import { config, connection } from './../jest.setup';
import { profileTest } from './data/testData';

let app_server;
let db;

beforeAll(async done => {
    db = await db_server();
    app_server = http.createServer(app).listen('3004');
    done();
});

afterAll(async done => {
    app_server.close(done);
    db.close();
    done();
});

describe('Profile Controller Test', () => {
    it('Get All Profile', async (done) => {
        const res = await request(app_server)
            .get(profileTest.getProfiles.getEndPoint())
            .set(setHeader);

        expect(res.status).toBe(200);
        done();
    });
});