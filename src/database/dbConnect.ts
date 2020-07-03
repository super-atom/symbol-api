import { Sequelize } from 'sequelize';
import { dbConfig } from '../configs/dbConfig';

export const connection = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',

    pool: {
        max: 2,
        min: 0,
        idle: 5000
    }
});

// connection.sync({ force: true });