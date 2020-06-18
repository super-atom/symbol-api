import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import * as util from '../utils/utils.index';
import { catchAsync } from '../utils/catchAsync';
import { ErrorHandler } from '../utils/errorHandler';
import { User } from '../models/entities/User';

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user_login_id, user_password } = req.body;
    if (!user_login_id || !user_password) {
        return next(new ErrorHandler(400, '아이디와 비밀번호를 입력해주세요.'));
    }
    User.findAll({ where: { user_login_id } }).then(data => {
        const user = data[0];
        let buff = user.user_password;
        const check = User.isValidPassword(user_password, buff.toString());
        if (!buff) new ErrorHandler(400, `${user_login_id} 유저가 존재하지 않습니다!`);
        if (!check) new ErrorHandler(400, "비밀번호가 일치하지 않습니다!");
        else {
            const token = User.getSignedToken(user.user_id);
            util.controllerResult(res, 200, token);
        }
    });
});