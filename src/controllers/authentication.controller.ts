import { Request, Response, NextFunction } from 'express';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/index';
import { User } from '../models/entity/User';
import { ErrorHandler } from '../utils/errorHandler';
import * as jwt from 'jsonwebtoken';

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user_login_id, user_password } = req.body;
    if (!user_login_id || !user_password) {
        return next(new ErrorHandler(400, '아이디와 비밀번호를 입력해주세요.'));
    }
    User.findAll({ where: { user_login_id } }).then(data => {
        let buff = data[0].user_password;
        const check = User.isValidPassword(user_password, buff.toString());
        if (!buff) new ErrorHandler(400, "유저가 존재하지 않습니다!");
        if (!check) new ErrorHandler(400, "비밀번호가 일치하지 않습니다!");
        else sendToken(data[0], 200, res);
    });
});

function sendToken(user, statusCode, res): any {
    const token = user.getSignedToken(user.user_id);
    // res.cookie("user", token);
    res.json({ message: "success", token });
}