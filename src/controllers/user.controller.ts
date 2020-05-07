import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from "typeorm";
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { User } from "../models/entity/User";
import { validate } from 'class-validator';

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getRepository(User)
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

        res.status(201).json({
            status: 'success',
            data: data
        });

    } catch (err) {
        return next(err);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.user_login_id = :id", { id: req.params.id })
            .getOne();

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (err) {
        return next(err);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getRepository(User).find();

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (err) {
        return next(err);
    }
};

export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getRepository(User)
            .createQueryBuilder()
            .update(User)
            .set({ user_password: bcrypt.hashSync(req.body.user_password, 10) })
            .where("user.user_login_id = :id", { id: req.params.id })
            .execute();

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (err) {
        return next(err);
    }
};