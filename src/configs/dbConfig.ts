import * as dotenv from 'dotenv';
import * as chalk from 'chalk';
dotenv.config();

export let dbConfig: any;

if (process.env.DB_LOCATION === 'local') {
    dbConfig = {
        host: process.env.LOCAL_DB_HOST,
        user: process.env.LOCAL_DB_USER,
        port: process.env.LOCAL_DB_PORT,
        password: process.env.LOCAL_DB_PASSWORD,
        database: process.env.LOCAL_DB_NAME,
    };
}
else if (process.env.DB_LOCATION === 'development') {
    dbConfig = {
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        port: process.env.DEV_DB_PORT,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
    };
}
else if (process.env.DB_LOCATION === 'production') {
    dbConfig = {
        host: process.env.LIVE_DB_HOST,
        user: process.env.LIVE_DB_USER,
        port: process.env.LIVE_DB_PORT,
        password: process.env.LIVE_DB_PASSWORD,
        database: process.env.LIVE_DB_NAME,
    };
} else {
    console.log(chalk.red("DB config 오류"));
}