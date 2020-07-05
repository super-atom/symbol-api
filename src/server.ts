import * as config from './configs/config';
import app from './app';
import { connection } from './database/dbConnect';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { logStorage } from './database/logStorage';
import * as utils from './utils/utils.index';

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

connection;
app.listen(config.app.server_port, () => {
    utils.myServerStateInfomation();
    logStorage;
});