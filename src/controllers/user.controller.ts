import express, {
    Request, Response, NextFunction
} from 'express';

import { getConnection, getRepository } from "typeorm";
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { User } from "../models/entity/User";

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                user_login_id: req.body.user_login_id,
                user_password: bcrypt.hashSync(req.body.user_password, 10),
                user_contribute_point: 0,
                user_signup_date: format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
            })
            .execute();
    } catch (err) {
        return next(err);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getRepository(User).find();
        return res.json(users);
    } catch (err) {
        return next(err);
    }
};

export const patchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ user_password: bcrypt.hashSync(req.body.user_password, 10) })
            .where("id = :id", { id: req.body.user_login_id })
            .execute();
    } catch (err) {
        return next(err);
    }
};