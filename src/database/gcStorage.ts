import { Storage } from '@google-cloud/storage';
import * as path from 'path';

const serviceKey = path.join(__dirname, '../../auth/symbol-project-ba5b07dbb2c8.json');
export const bucketName = 'symbolproject';

export const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'symbol-project'
});

export default storage;