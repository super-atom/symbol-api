import app from './app';
import './database/dbConnect';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import * as utils from './utils/utils.index';
import { logStorage } from './database/logStorage';
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


let SERVER_PORT;
if (process.env.NODE_ENV === 'development') {
    SERVER_PORT = process.env.DEV_DB_SERVER_PORT
} else if (process.env.NODE_ENV === 'production') {
    SERVER_PORT = process.env.LIVE_DB_SERVER_PORT
}

app.listen(SERVER_PORT, () => {
    if (process.env.NODE_ENV === 'development') {
        utils.myIpInformation();
        logStorage;
    }
    console.info(`Server running... Port ${SERVER_PORT} Mode ${process.env.NODE_ENV}`);
});