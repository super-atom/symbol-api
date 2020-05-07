import HttpError from '../class/httpError';
import { Response } from 'express';

function errorMiddleware(error: HttpError, res: Response): void {
    error.status = error.status || 'Error';
    error.statusCode = error.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        res
            .status(error.statusCode)
            .json({
                status: error.status,
                error: error,
                message: error.message,
                stack: error.stack
            });
    } else if (process.env.NODE_ENV === 'production') {
        res
            .status(error.statusCode)
            .json({
                status: error.status,
                message: error.message
            });
    }

};

export default errorMiddleware;