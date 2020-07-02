import dbConfig from '../configs/dbConfig';
import { Sequelize } from 'sequelize';
import * as chalk from 'chalk';

export const connection = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
});

// (async () => {
//     try {
//         await connection.authenticate();
//         console.log(chalk.green("DB connection success!"));
//     } catch (error) {
//         console.log(chalk.red("DB connection fail!\n", error));
//     }
// })();


// connection.sync({ force: true });

export default connection;