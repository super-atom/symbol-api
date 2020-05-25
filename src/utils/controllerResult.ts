import { ErrorHandler } from './errorHandler';

export function controllerResult(data: any, res) {
    if (!data) throw new ErrorHandler(404, 'Error');
    res.json({
        status: 'success',
        data: data
    });
}