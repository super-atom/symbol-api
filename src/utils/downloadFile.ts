import Axios, * as axios from 'axios';

export async function downloadImageToBase64(url) {
    return await Axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
    }).then(res => Buffer.from(res.data, 'binary').toString('base64'));
}