import { ConsoleTransportOptions } from "winston/lib/winston/transports";

export function controllerResult(res, statusCode?: number, data?: any, message?: string) {
    if (!message) {
        if (statusCode === 200) message = 'success';
        if (statusCode === 400) message = 'error';
    }

    if (res) {
        res.status(statusCode);
        if (data === null || undefined) {
            res.json({
                status: message
            });
        } else {
            res.json({
                status: message,
                data: data
            });
        }
    }
}