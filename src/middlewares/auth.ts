import * as jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { ErrorHandler } from '../utils/errorHandler';
import { Response, Request, NextFunction } from 'express';
import { User } from '../models/entity/User';

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

export const authorize = (...roles): any => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    }
};