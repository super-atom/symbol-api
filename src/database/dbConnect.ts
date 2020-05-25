import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from '../models/entity/User';
import { UserType } from '../models/entity/UserType';
import { InitModelData } from '../models/data/index';

declare let process: {
    env: {
        DB_HOST: string,
        DB_PORT: number,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_NAME: string
    }
}

export const connection = createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User,
        UserType
    ],
}).then(() => {
    console.log('DB connected!');
    new InitModelData();
}).catch(error => console.log(error));