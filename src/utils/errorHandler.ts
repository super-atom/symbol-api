export class ErrorHandler extends Error {
    constructor(statusCode: number, message: string, stack?: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.stack = stack;
    }
}

export const handleError = (err, res) => {
    const { statusCode, message, stack } = err;
    res.status(statusCode || 500).json({
        status: "error",
        statusCode,
        message,
        stack
    });

    if (process.env.NODE_ENV === 'development') console.error(stack);
};