import { Request, Response, NextFunction } from 'express';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/index';
import { User } from '../models/entity/User';
import { ErrorHandler } from '../utils/errorHandler';
import * as jwt from 'jsonwebtoken';

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user_login_id, user_password } = req.body;

    if (!user_login_id || !user_password) {
        return next(new ErrorHandler(400, '아이디와 비밀번호를 입력해주세요.'));
    }

    let token = jwt.sign({ user_login_id }, "SYMBOL", { expiresIn: "1m" });

    User.findAll().then(data => {
        let buff = data[0].user_password;

        if (User.isValidPassword(user_password, buff.toString())) {
            res.cookie("user", token);
            res.json({ token });
        } else {
            res.json({
                error: "비밀번호가 일치하지 않습니다!"
            })
        }
    })
    // util.controllerResult(res, 200);
});