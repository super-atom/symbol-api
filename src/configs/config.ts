import * as dotenv from 'dotenv';
import { ENV_MODE } from './constants';

export const app: any = {
    server_port: null,
};

export const db: any = {
    host: null,
    user: null,
    port: null,
    password: null,
    schema: null
};

((): any => {
    dotenv.config();
    if (process.env.MODE === ENV_MODE.LOCAL) {
        app.server_port = process.env.LOCAL_APP_SERVER_PORT;
        db.host = process.env.LOCAL_DB_HOST;
        db.user = process.env.LOCAL_DB_USER;
        db.port = process.env.LOCAL_DB_PORT;
        db.password = process.env.LOCAL_DB_PASSWORD;
        db.schema = process.env.LOCAL_DB_SCHEMA;
    }
    else if (process.env.MODE === ENV_MODE.LOCAL_TEST) {
        app.server_port = process.env.LOCAL_TEST_APP_SERVER_PORT;
        db.host = process.env.LOCAL_TEST_DB_HOST;
        db.user = process.env.LOCAL_TEST_DB_USER;
        db.port = process.env.LOCAL_TEST_DB_PORT;
        db.password = process.env.LOCAL_TEST_DB_PASSWORD;
        db.schema = process.env.LOCAL_TEST_DB_SCHEMA;
    }
    else if (process.env.MODE === ENV_MODE.DEV) {
        app.server_port = process.env.DEV_APP_SERVER_PORT;
        db.host = process.env.DEV_DB_HOST;
        db.user = process.env.DEV_DB_USER;
        db.port = process.env.DEV_DB_PORT;
        db.password = process.env.DEV_DB_PASSWORD;
        db.schema = process.env.DEV_DB_SCHEMA;
    }
    else if (process.env.MODE === ENV_MODE.DEV_TEST) {
        app.server_port = process.env.DEV_TEST_APP_SERVER_PORT;
        db.host = process.env.LOCAL_TEST_DB_HOST;
        db.user = process.env.DEV_TEST_DB_USER;
        db.port = process.env.DEV_TEST_DB_PORT;
        db.password = process.env.DEV_TEST_DB_PASSWORD;
        db.schema = process.env.DEV_TEST_DB_SCHEMA;
    }
    else if (process.env.MODE === ENV_MODE.PRODUCTION) {
        app.server_port = process.env.LIVE_APP_SERVER_PORT;
        db.host = process.env.LIVE_DB_HOST;
        db.user = process.env.LIVE_DB_USER;
        db.port = process.env.LIVE_DB_PORT;
        db.password = process.env.LIVE_DB_PASSWORD;
        db.schema = process.env.LIVE_DB_SCHEMA;
    }
})();