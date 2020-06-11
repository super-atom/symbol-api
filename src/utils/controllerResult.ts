export function controllerResult(res, statusCode?: number, data?: any, message?: string) {
    if (statusCode === 200) message = 'success';

    if (res) {
        res.json({
            status: message,
            data: data
        });
    }
}