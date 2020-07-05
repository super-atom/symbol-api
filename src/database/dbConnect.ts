import { Sequelize } from 'sequelize';
import * as config from '../configs/config';

export const connection = new Sequelize(config.db.schema, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',

    pool: {
        max: 10,
        min: 0,
        idle: 5000
    }
});

// connection.sync({ force: true });