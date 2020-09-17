import { Sequelize } from 'sequelize';
import * as chalk from 'chalk';

export async function dbConnectionCheck(connection: Sequelize): Promise<boolean | undefined> {
    try {
        const transaction = await connection.authenticate().then(() => { return true });
        if (transaction === true) {
            console.log(chalk.green("DB connection success!"));
            return true
        } else {
            console.log(chalk.red("DB connection fail!"));
            return false;
        }
    } catch (error) {
        console.log(chalk.red("DB connection fail!\n", error));
    }
}