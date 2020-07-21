import * as http from 'http';
import * as request from 'supertest';
import app from '../src/app';
import { db_server, setHeader } from './../jest.global';
import { userTest } from './data/testData';

let app_server;
let db;

beforeAll(async done => {
    db = await db_server();
    app_server = http.createServer(app).listen('3002');
    done();
});

afterAll(async done => {
    app_server.close(done);
    db.close();
    done();
});

describe('User Controller Test', () => {
    it('Create Single User', async (done) => {
        const res = await request(app_server)
            .post(userTest.createUser.getEndPoint())
            .send(userTest.createUser.getData())
            .set(setHeader);
        expect(res.status).toBe(200);
        done();
    });

    it('Get All User', async (done) => {
        const res = await request(app_server)
            .get(userTest.getUsers.getEndPoint())
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