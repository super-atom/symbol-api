import "reflect-metadata";
import {createConnection} from "typeorm";
import { User } from '../models/entity/User';

createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [ User ]
}).then(connection => {
    console.log('DB connected!');
}).catch(error => console.log(error));