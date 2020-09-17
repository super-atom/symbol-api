import * as spdy from 'spdy';
import * as fs from 'fs';
import * as path from 'path';

import * as config from './configs/config';
import { connection } from './database/dbConnect';
import { logStorage } from './database/logStorage';

import app from './app';
import * as utils from './utils/utils.index';

const certPath = path.resolve(path.join('/etc/ssl/certs/super-atom.com.pem'));
const keyPath = path.resolve(path.join('/etc/ssl/private/super-atom.com.key'));

const options: spdy.ServerOptions = {
    cert: fs.readFileSync(certPath, 'utf8'),
    key: fs.readFileSync(keyPath, 'utf8'),
    spdy: {
        protocols: ['h2', 'spdy/3.1', 'http/1.1'],
        plain: false
    }
};

config;
connection;
logStorage;
utils.myServerStateInfomation();
utils.myIpInformation();
spdy.createServer(options, app).listen(config.app.https_server_port);