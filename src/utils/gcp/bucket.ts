import { storage, bucketName } from '../../database/gcStorage';
import * as dateFns from 'date-fns';

const bucket = storage.bucket(bucketName);

export async function listBuckets() {
    // Lists all buckets in the current project

    const [buckets] = await storage.getBuckets();
    console.log('Buckets:');
    buckets.forEach(bucket => {
        console.log(bucket.name);
    });
}

export async function getBucketMetadata() {
    // Get Bucket Metadata
    const [metadata] = await storage.bucket(bucketName).getMetadata();

    for (const [key, value] of Object.entries(metadata)) {
        console.log(`${key}: ${value}`);
    }
}

export async function uploadFile(filename, filenameToSave) {
    if (filenameToSave === false) filenameToSave = "noname_" + dateFns.formatISO(new Date());
    const file = bucket.file(filenameToSave);
    const buff = Buffer.from(filename, 'binary').toString('utf-8');

    const stream = file.createWriteStream({
        metadata: {
            contentType: 'image/png'
        }
    });

    stream.on('error', (err) => {
        return err;
    });
    stream.on('finish', () => {
        return filenameToSave;
    });
    stream.end(Buffer.from(buff, 'base64'));

    console.log(`Create Post Image : ${filenameToSave} uploaded to ${bucketName}.`);
}