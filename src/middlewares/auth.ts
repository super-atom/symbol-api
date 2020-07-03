import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from '../types/types.index';
import { catchAsync } from '../utils/catchAsync';
import { ErrorHandler } from './errorHandler';
import { User } from '../models/entities/User';
import * as utils from '../utils/utils.index';

export const authenticate = catchAsync(async (req: Response, res: Request, next: NextFunction) => {
    let token;
    const auth_data = req.headers.authorization;

    if (
        auth_data &&
        auth_data.startsWith('Bearer')) {
        token = auth_data.split(' ')[1];
    }

    if (!token) return next(new ErrorHandler("Not authorize to access this route"));
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.user_id);
            next();
        } catch (err) {
            next(new ErrorHandler("No permission"));
        }
    }
});

export const authorize = (req: Response, res: Request, next: NextFunction, role: number) => {
    // FIXME: 고쳐야됨
    return (req: Response, res: Request, next: NextFunction): void => {
        let user_type;
        if (utils.isEmptyData(req.user.user_type)) {
            return next(new ErrorHandler("로그인이 필요합니다!"));
        } else {
            user_type = req.user.user_type;
            if (role > user_type) {
                return next(new ErrorHandler("권한이 없습니다!"));
            } else {
                next();
            }
        }
    }
};