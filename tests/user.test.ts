import * as http from 'http';
import * as request from 'supertest';
import * as crypto from 'crypto';
import * as config from '../src/configs/config';
import app from '../src/app';
import { connection } from '../src/database/dbConnect';
import { setHeader } from './../jest.setup';
import * as mockup from './mockup';

config;
let app_server;
let db_server;

beforeAll(async done => {
    db_server = connection;
    app_server = http.createServer(app);
    app_server.listen('3002', done);
});

afterAll(async done => {
    app_server.close(done);
    db_server.close(done);
});

describe('User Controller Test', () => {
    it('Create Single User', async (done) => {
        const res = await request(app_server)
            .post('/users')
            .send(mockup.user)
            .set(setHeader);
        expect(res.status).toBe(200);
        done();
    });

    it('Get All User', async (done) => {
        const res = await request(app_server)
            .get('/users?page=0&limit=3&order=ASC&sortBy=createdAt')
            .set(setHeader);

        expect(res.status).toBe(200);
        done();
    });

    // it('Get Single User', async (done) => {
    //     const res = await request(app_server)
    //         .get('/users/:id')
    //         .set(setHeader)
    //         .query({
    //             id: '8f0107b2-356b-48fe-bbe7-aa7fd676a633'
    //         })
    //     expect(res.status).toBe(200);
    //     done();
    // });
});