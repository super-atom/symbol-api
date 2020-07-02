import { Storage } from '@google-cloud/storage';
import { GoogleServiceAccountKey } from '../apis/googleapis';
import { ENVIRONMENT_VARIABLES_SETTING } from '../configs/config';

ENVIRONMENT_VARIABLES_SETTING();

export const bucketName = process.env.GOOGLE_STORAGE_BUCKET;

export const storage = new Storage({
    keyFilename: GoogleServiceAccountKey,
    projectId: process.env.GOOGLE_PROJECT_ID
});

export default storage;