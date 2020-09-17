
import { ErrorHandler } from '../middlewares/errorHandler';
import * as utils from '../utils/utils.index';
import { Response, LooseObject } from '../types/types.index';

export function controllerResult(res: Response, statusCode?: number, data?: any, message?: string): object | void {
    const result: LooseObject = {
        status: ''
    }

    if (utils.isEmptyData(res)) new ErrorHandler('Not exists request object');
    if (utils.isEmptyData(statusCode)) new ErrorHandler('Not exists statusCode');
    else {
        if (statusCode === 200) result.status = 'success';
        if (statusCode === 400) result.status = 'error';
    }
    if (utils.isEmptyData(data) === false) result.data = data;
    if (utils.isEmptyData(message)) {
        if (data === null) result.status = 'Not exists data';
    } else {
        if (process.env.NODE_ENV === "development") {
            // TODO: 개발모드일 때만 정보성 스트링 출력
        }
        result.status = message;
    }
    if (statusCode) res.status(statusCode).json(result);
}

export function getControllerResult(res: Response, data: object | null | undefined): any {
    if (utils.isEmptyData(data)) {
        if (data === undefined) {
            utils.controllerResult(res, 400, null, "Undefined data");
        }
        else if (data === null) {
            utils.controllerResult(res, 400, null, "Not exists data");
        }
    } else {
        utils.controllerResult(res, 200, data);
    }
}