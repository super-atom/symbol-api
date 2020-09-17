import { storage, bucketName } from '../../database/gcStorage';
import * as dateFns from 'date-fns';

export async function listBuckets(): Promise<void> {
    // Lists all buckets in the current project
    const [buckets] = await storage.getBuckets();
    console.log('Buckets:');
    buckets.forEach((bucket: any) => {
        console.log(bucket.name);
    });
}

export async function getBucketMetadata(): Promise<void> {
    // Get Bucket Metadata
    if (bucketName === undefined) {
        console.log("Not exists bucket");
    } else {
        const [metadata] = await storage.bucket(bucketName).getMetadata();
        for (const [key, value] of Object.entries(metadata)) {
            console.log(`${key}: ${value}`);
        }
    }
}

export async function uploadFile(filename: string, filenameToSave: string): Promise<any> {
    if (bucketName === undefined) {
        console.log("Not exists bucket");
    } else {
        const bucket = storage.bucket(bucketName);
        if (filenameToSave === undefined) {
            filenameToSave = "noname_" + dateFns.formatISO(new Date());
        }
        const file = bucket.file(filenameToSave);
        const buff = Buffer.from(filename, 'binary').toString('utf-8');

        const stream = file.createWriteStream({
            metadata: {
                contentType: 'image/png'
            }
        });

        stream.on('error', (err: any) => {
            return err;
        });
        stream.on('finish', () => {
            return filenameToSave;
        });
        stream.end(Buffer.from(buff, 'base64'));
        // console.log(`Create Image : ${filenameToSave} uploaded to ${bucketName} Bucket.`);
    }
}