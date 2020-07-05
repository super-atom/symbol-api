import { Sequelize } from 'sequelize';
import * as config from '../configs/config';
// import * as utils from '../utils/utils.index';

export const connection = new Sequelize(config.db.schema, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

// connection.sync({ force: true, logging: false });