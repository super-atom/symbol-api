import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { User } from "../models/entity/User";
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/index';

export const postUser = catchAsync(async (req: Request, res: Response) => {
    await getRepository(User)
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            user_login_id: req.body.user_login_id,
            user_email: req.body.user_email,
            user_password: bcrypt.hashSync(req.body.user_password, 10),
            user_contribute_point: 0,
            user_signup_date: format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
        })
        .execute();
    util.controllerResult({
        "user_login_id": req.body.user_login_id,
        "user_email": req.body.user_email
    }, res);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const result = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.user_login_id = :id", { id: req.params.id })
        .getOne();
    util.controllerResult(result, res);
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const data = await getRepository(User).find();
    const result: Array<object> = [];
    data.forEach(el => {
        result.push({
            "user_login_id": el.user_login_id,
            "user_email": el.user_email,
            "user_type": el.user_type
        })
    });
    util.controllerResult(result, res);
});

export const patchUser = catchAsync(async (req: Request, res: Response) => {
    const result = await getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set({ user_password: bcrypt.hashSync(req.body.user_password, 10) })
        .where("user.user_login_id = :id", { id: req.params.id })
        .execute();
    util.controllerResult(result, res);
});