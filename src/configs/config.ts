import * as dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { NODE_ENV } from './constants';

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

    // Sentry.init({
    //     dsn: process.env.SENTRY_DNS,
    //     integrations: [new RewriteFrames({
    //         root: global.__rootdir__
    //     })]
    // });
    global.__rootdir__ = __dirname || process.cwd();

    switch (process.env.NODE_ENV) {
        case NODE_ENV.LOCAL:
            app.server_port = process.env.LOCAL_APP_SERVER_PORT;
            db.host = process.env.LOCAL_DB_HOST;
            db.user = process.env.LOCAL_DB_USER;
            db.port = process.env.LOCAL_DB_PORT;
            db.password = process.env.LOCAL_DB_PASSWORD;
            db.schema = process.env.LOCAL_DB_SCHEMA;
            break;
        case NODE_ENV.DEV:
            app.server_port = process.env.DEV_APP_SERVER_PORT;
            db.host = process.env.DEV_DB_HOST;
            db.user = process.env.DEV_DB_USER;
            db.port = process.env.DEV_DB_PORT;
            db.password = process.env.DEV_DB_PASSWORD;
            db.schema = process.env.DEV_DB_SCHEMA;
            break;
        case NODE_ENV.LIVE:
            app.server_port = process.env.LIVE_APP_SERVER_PORT;
            db.host = process.env.LIVE_DB_HOST;
            db.user = process.env.LIVE_DB_USER;
            db.port = process.env.LIVE_DB_PORT;
            db.password = process.env.LIVE_DB_PASSWORD;
            db.schema = process.env.LIVE_DB_SCHEMA;
            break;
        default:
            break;
    }
})();