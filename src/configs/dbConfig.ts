import * as dotenv from 'dotenv';
import * as chalk from 'chalk';
dotenv.config();

let dbConfig;

if (process.env.NODE_ENV === 'local') {
    dbConfig = {
        host: process.env.LOCAL_DB_HOST,
        user: process.env.LOCAL_DB_USER,
        port: process.env.LOCAL_DB_PORT,
        password: process.env.LOCAL_DB_PASSWORD,
        database: process.env.LOCAL_DB_NAME,
    };
}
else if (process.env.NODE_ENV === 'development') {
    dbConfig = {
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        port: process.env.DEV_DB_PORT,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
    };
}
else if (process.env.NODE_ENV === 'production') {
    dbConfig = {
        host: process.env.LIVE_DB_HOST,
        user: process.env.LIVE_DB_USER,
        port: process.env.LIVE_DB_PORT,
        password: process.env.LIVE_DB_PASSWORD,
        database: process.env.LIVE_DB_NAME,
    };
} else {
    console.error(chalk.red("DB config 오류"));
}


export default dbConfig;