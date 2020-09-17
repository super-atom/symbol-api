import { Response } from "express";

export class ErrorHandler extends Error {
    constructor(message: string, stack?: string) {
        super();
        this.message = message;
        this.stack = stack;
    }
}

export const handleError = (err: ErrorHandler, res: Response): void => {
    const { message, stack } = err;
    const options: any = {
        status: "error"
    };
    if (process.env.NODE_ENV === "development") {
        options.message = message;
        options.stack = stack;
        // console.log(stack);
    }
    res.status(500).json(options);
};