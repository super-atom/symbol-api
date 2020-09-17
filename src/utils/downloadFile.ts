import Axios from 'axios';

/**
 * @category Util
 * @param url 다운로드 받을 이미지의 url
 * @return 바이너리 버퍼 형태로 다운로드받은 이미지를 base64 로 인코딩한 문자열
 */
export async function downloadImageToBase64(url: string): Promise<string> {
    return await Axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
    }).then(res => Buffer.from(res.data, 'binary').toString('base64'));
}