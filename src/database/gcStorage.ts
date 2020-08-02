import { Storage } from '@google-cloud/storage';
import { GoogleServiceAccountKey } from '../apis/googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

export const bucketName = process.env.GOOGLE_STORAGE_BUCKET;
export const storage: any = null;

// export const storage = new Storage({
//     keyFilename: GoogleServiceAccountKey,
//     projectId: process.env.GOOGLE_PROJECT_ID
// });

export default storage;