import app from './app';
import './database/dbConnect';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import * as utils from './utils/utils.index';
import { logStorage } from './database/logStorage';
import { ENVIRONMENT_VARIABLES_SETTING } from './configs/config';
// declare global {
//     namespace NodeJS {
//         interface Global {
//             __rootdir__: string;
//         }
//     }
// }

// Sentry.init({
//     dsn: process.env.SENTRY_DNS,
//     integrations: [new RewriteFrames({
//         root: global.__rootdir__
//     })]
// });

// global.__rootdir__ = __dirname || process.cwd();


ENVIRONMENT_VARIABLES_SETTING();

let SERVER_PORT;
let DB_HOST;
if (process.env.NODE_ENV === 'local') {
    SERVER_PORT = process.env.LOCAL_DB_SERVER_PORT;
    DB_HOST = process.env.LOCAL_DB_HOST
}
else if (process.env.NODE_ENV === 'development') {
    SERVER_PORT = process.env.DEV_DB_SERVER_PORT
    DB_HOST = process.env.DEV_DB_HOST
}
else if (process.env.NODE_ENV === 'production') {
    SERVER_PORT = process.env.LIVE_DB_SERVER_PORT
    DB_HOST = process.env.LIVE_DB_HOST
}

app.listen(SERVER_PORT, () => {
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
        // utils.myIpInformation();
        logStorage;
    }
    console.info(`App server running ...Mode : ${process.env.NODE_ENV} Port : ${SERVER_PORT} DB HOST : ${DB_HOST}`);
});