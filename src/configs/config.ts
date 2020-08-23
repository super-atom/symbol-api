import './environment';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { NODE_ENV } from './constants';

export const app: any = {
    http_server_port: null,
    https_server_port: null,
};

export const db: any = {
    host: null,
    user: null,
    port: null,
    password: null,
    schema: null
};

((): any => {
    // Sentry.init({
    //     dsn: process.env.SENTRY_DNS,
    //     integrations: [new RewriteFrames({
    //         root: global.__rootdir__
    //     })]
    // });
    global.__rootdir__ = __dirname || process.cwd();

    switch (process.env.MODE) {
        case NODE_ENV.LOCAL:
            app.http_server_port = process.env.LOCAL_APP_HTTP_SERVER_PORT;
            app.https_server_port = process.env.LOCAL_APP_HTTPS_SERVER_PORT;
            db.host = process.env.LOCAL_DB_HOST;
            db.user = process.env.LOCAL_DB_USER;
            db.port = process.env.LOCAL_DB_PORT;
            db.password = process.env.LOCAL_DB_PASSWORD;
            db.schema = process.env.LOCAL_DB_SCHEMA;
            break;
        case NODE_ENV.DEVELOPMENT:
            app.http_server_port = process.env.DEV_APP_HTTP_SERVER_PORT;
            app.https_server_port = process.env.DEV_APP_HTTPS_SERVER_PORT;
            db.host = process.env.DEV_DB_HOST;
            db.user = process.env.DEV_DB_USER;
            db.port = process.env.DEV_DB_PORT;
            db.password = process.env.DEV_DB_PASSWORD;
            db.schema = process.env.DEV_DB_SCHEMA;
            break;
        case NODE_ENV.PRODUCTION:
            app.http_server_port = process.env.PRODUCTION_APP_HTTP_SERVER_PORT;
            app.https_server_port = process.env.PRODUCTION_APP_HTTPS_SERVER_PORT;
            db.host = process.env.PRODUCTION_DB_HOST;
            db.user = process.env.PRODUCTION_DB_USER;
            db.port = process.env.PRODUCTION_DB_PORT;
            db.password = process.env.PRODUCTION_DB_PASSWORD;
            db.schema = process.env.PRODUCTION_DB_SCHEMA;
            break;
        default:
            break;
    }
})();