import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

import * as config from './configs/config';
import { connection } from './database/dbConnect';
import { logStorage } from './database/logStorage';

import app from './app';
import * as utils from './utils/utils.index';

const keyPath = path.resolve(path.join('ssl/private.pem'));
const certPath = path.resolve(path.join('ssl/public.pem'));

const options = {
    key: fs.readFileSync(keyPath, 'utf8'),
    cert: fs.readFileSync(certPath, 'utf8')
};

config;
connection;
logStorage;
// utils.myServerStateInfomation();
// utils.myIpInformation();
http.createServer(app).listen(config.app.http_server_port);
https.createServer(options, app).listen(config.app.https_server_port);