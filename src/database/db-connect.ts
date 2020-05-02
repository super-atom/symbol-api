import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection({
    type: "mysql",
    host: "34.85.78.141",
    port: 3306,
    username: "root",
    password: "chfldzm2",
    database: "symbol",
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
    console.log('DB connected!');
}).catch(error => console.log(error));