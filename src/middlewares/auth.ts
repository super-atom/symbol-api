import * as jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { ErrorHandler } from '../utils/errorHandler';
import { Response, Request, NextFunction } from 'express';

export const authenticate = catchAsync(async (req: Response, res: Request, next: NextFunction) => {
    let token = req.cookies.user;
    let decoded = jwt.verify(token, "SYMBOL");
    if (decoded) console.log("권한 있어서 수행");
    next();
});