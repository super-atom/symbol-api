import express, {
    Request, Response, NextFunction
} from 'express';

export const notFound = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    return res.status(404).json({
        "message": "Not Found"
    });
};