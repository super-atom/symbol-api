import { UserTypeRule } from './../rules/type.rule';
import * as jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { ErrorHandler } from '../utils/errorHandler';
import { Response, Request, NextFunction } from 'express';
import { User } from '../models/entities/User';

export const authenticate = catchAsync(async (req: Response, res: Request, next: NextFunction) => {
    let token;
    const auth_data = req.headers.authorization;

    if (
        auth_data &&
        auth_data.startsWith('Bearer')) {
        token = auth_data.split(' ')[1];
    }

    if (!token) return next(new ErrorHandler(401, "Not authorize to access this route"));
    else {
        try {
            let decoded = jwt.verify(token, "SYMBOL");
            req.user = await User.findByPk(decoded.user_id);
            next();
        } catch (err) {
            next(new ErrorHandler(401, "No permission"));
        }
    }
});

export const authorize = (role: number) => {
    return (req, res, next) => {
        const check = (role <= req.user.user_type);
        if (!check) return next(new ErrorHandler(400, "권한이 없습니다!"));
        next();
    }
};