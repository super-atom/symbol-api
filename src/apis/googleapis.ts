import { google } from 'googleapis';
import * as path from 'path';
import { ENVIRONMENT_VARIABLES_SETTING } from '../configs/config';
import { getSheetList } from '../utils/gcp/spreadsheet';

ENVIRONMENT_VARIABLES_SETTING();

export const GoogleServiceAccountKey = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS) + ".json";

// generate a url that asks permissions for google service scopes
const scopes = [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/compute',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/spreadsheets'
];

const auth = new google.auth.GoogleAuth({
    keyFile: GoogleServiceAccountKey,
    scopes,
});

google.options({
    timeout: 1000,
    auth,
    params: {
        quotaUser: 'super0atom@gmail.com'
    }
});

