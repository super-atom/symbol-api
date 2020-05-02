import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "test":
        path = '../../.env.test';
        break;
    case "dev":
        path = '../../.env.dev';
        break;
    case "production":
        path = '../../.env.production';
        break;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const PORT = process.env.PORT;
