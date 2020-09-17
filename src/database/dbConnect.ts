import { Sequelize } from 'sequelize';
import * as config from '../configs/config';
import * as chalk from 'chalk';

export const connection = new Sequelize(config.db.schema, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

connection.authenticate()
    .then(() => {
        console.log(chalk.green('DB Connection success!'));
    })
    .catch(err => {
        console.error(chalk.red('Unable to connect to the database:\n'), err);
    });

// connection.sync({ force: true, logging: false });