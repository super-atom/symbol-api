import { ErrorHandler } from './errorHandler';
import * as utils from '../utils/utils.index';

export function controllerResult(res, statusCode?: number, data?: any, message?: string) {
    let result = {
        status: undefined
    }

    if (utils.isEmptyData(res)) {
        new ErrorHandler(400, 'Not exist request object');
    }

    if (utils.isEmptyData(statusCode)) {
        new ErrorHandler(400, 'Not exist statusCode');
    } else {
        if (statusCode === 200) result.status = 'success';
        if (statusCode === 400) result.status = 'error';
    }

    if (utils.isEmptyData(data) === false) result.data = data;

    if (message === null || undefined) {
        if (data === null) result.status = 'Not exist data';
    } else {
        if (process.env.NODE_ENV === "development") {
            // TODO: 개발모드일 때만 정보성 스트링 출력
        }
        result.status = message;
    }
    res.status(statusCode).json(result);
}