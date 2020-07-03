import * as chalk from 'chalk';

export async function dbConnectionCheck(connection: any): Promise<void> {
    try {
        const transaction = await connection.authenticate().then(() => { return true });
        if (transaction === true) {
            console.log(chalk.green("DB connection success!"));
        } else {
            console.log(chalk.red("DB connection fail!"));
        }
    } catch (error) {
        console.log(chalk.red("DB connection fail!\n", error));
    }
}