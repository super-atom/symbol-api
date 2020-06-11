import app from './app';
import './database/dbConnect';
import * as dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

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

dotenv.config();
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running... Port ${process.env.SERVER_PORT} Mode ${process.env.NODE_ENV}`);
});