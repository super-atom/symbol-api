import dbConfig from './dbConfig';
import { Sequelize } from 'sequelize';

export const connection = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
});

// connection.sync({ force: true });

export default connection;