import app from './app';
import './database/dbConnect';
import * as dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { ProfileTypeRule } from './rules/type.rule';
import * as os from 'os';
const ifaces = os.networkInterfaces();

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

    // Object.keys(ifaces).forEach(function (ifname) {
    //     var alias = 0;

    //     ifaces[ifname].forEach(function (iface) {
    //         if ('IPv4' !== iface.family || iface.internal !== false) {
    //             // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
    //             return;
    //         }

    //         if (alias >= 1) {
    //             // this single interface has multiple ipv4 addresses
    //             console.log(ifname + ':' + alias, iface.address);
    //         } else {
    //             // this interface has only one ipv4 adress
    //             console.log(ifname, iface.address);
    //         }
    //         ++alias;
    //     });
    // });
});