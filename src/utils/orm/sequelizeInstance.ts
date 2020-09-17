import { Sequelize } from 'sequelize';

export const sequelize = (config: any): Sequelize => {
    return new Sequelize(config.schema, config.user, config.password, {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 5000
        }
    });
}