import { connection } from './src/database/dbConnect';
import * as config from './src/configs/config';

config;
export const db_server = async () => await connection.sync({ force: true, logging: false });

export const setHeader = {
    'Accept': 'supertest',
    'User-Agent': '*/*',
    'Content-Type': 'application/json',
}

export default async (): Promise<any> => {
    console.log("JEST GLOBAL", await db_server());
};