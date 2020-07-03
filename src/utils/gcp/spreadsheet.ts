import { google } from 'googleapis';
import * as chalk from 'chalk';

export async function getSheetList(auth: string, spreadsheetId: string): Promise<object | any> {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'ERROR_CODE!A1:B',
    }, (err, res) => {
        if (err) return console.log(chalk.yellow('The API returned an error: ' + err));
        const rows = res.data.values;
        if (rows.length) {
            return rows;
            // Print columns A and E, which correspond to indices 0 and 4.
            // rows.map((row) => {
            //     console.log(`${row[0]}, ${row[1]}`);
            // });
        } else {
            return null;
        }
    });
}