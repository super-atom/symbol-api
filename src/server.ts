import * as config from './configs/config';
import app from './app';
import { connection } from './database/dbConnect';
import { logStorage } from './database/logStorage';
import * as utils from './utils/utils.index';

config;
connection;
app.listen(config.app.server_port, () => {
    utils.myServerStateInfomation();
    logStorage;
});