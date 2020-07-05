import { Storage } from '@google-cloud/storage';
import { GoogleServiceAccountKey } from '../apis/googleapis';

export const bucketName = process.env.GOOGLE_STORAGE_BUCKET;

export const storage = new Storage({
    keyFilename: GoogleServiceAccountKey,
    projectId: process.env.GOOGLE_PROJECT_ID
});

export default storage;