export class HttpError extends Error {
    status: string;
    statusCode: number;
    message: string;

    constructor(status: string, statusCode: number, message: string) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default HttpError;