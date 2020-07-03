
import { ErrorHandler } from '../middlewares/errorHandler';
import * as utils from '../utils/utils.index';
import { Response } from '../types/types.index';

export function controllerResult(res: Response, statusCode?: number, data?: any, message?: string): object | void {
    const result = {
        status: ''
    }

    if (utils.isEmptyData(res)) {
        new ErrorHandler('Not exist request object');
    }

    if (utils.isEmptyData(statusCode)) {
        new ErrorHandler('Not exist statusCode');
    } else {
        if (statusCode === 200) result.status = 'success';
        if (statusCode === 400) result.status = 'error';
    }

    if (utils.isEmptyData(data) === false) result.data = data;

    if (message === null || message === undefined) {
        if (data === null) result.status = 'Not exist data';
    } else {
        if (process.env.NODE_ENV === "development") {
            // TODO: 개발모드일 때만 정보성 스트링 출력
        }
        result.status = message;
    }
    if (statusCode) res.status(statusCode).json(result);
}