import * as request from 'supertest';
import * as http from 'http';
import app from '../app';
import { ENVIRONMENT_VARIABLES_SETTING } from '../configs/config';
import { connection } from '../database/dbConnect';

ENVIRONMENT_VARIABLES_SETTING();

describe('Application initialization Check', () => {
    let server;
    let SERVER_PORT: string | undefined = '3001';
    let DB_HOST: string | undefined;

    if (process.env.DB_LOCATION === 'local') {
        DB_HOST = process.env.LOCAL_DB_HOST;
    }
    else if (process.env.DB_LOCATION === 'development') {
        DB_HOST = process.env.DEV_DB_HOST;
    }
    else if (process.env.DB_LOCATION === 'production') {
        DB_HOST = process.env.LIVE_DB_HOST;
    }

    beforeAll(done => {
        server = http.createServer(app);
        server.listen(SERVER_PORT, done);
        connection;
    });

    afterAll(done => {
        server.close(done);
        connection.close();
    });

    it('Server connection check', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });
    // it('DB connection check', async () => {
    //     const response = await request(server)
    //         .get('/dbconnection');
    //     expect(response.status).toBe(200);
    // });
    it('Get All User', async () => {
        const response = await request(server)
            .get('/users?page=0&limit=3&order=ASC&sortBy=createdAt');
        expect(response.status).toBe(200);
    });
});
