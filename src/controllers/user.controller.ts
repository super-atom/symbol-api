import { Request, Response } from 'express';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/index';
import { User } from '../models/entity/User';
import { Profile } from '../models/entity/Profile';
import { Human } from '../models/entity/Human';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const human_uuid = uuidv4();
    const user_uuid = uuidv4();
    const { user_login_id, user_email, user_password, gender, age, birthday, real_name, birth_country, birth_city, activity_country, current_live_city } = req.body;

    Human.create({
        human_id: human_uuid,
        gender: gender,
        age: age,
        birthday: birthday,
        real_name: real_name,
        birth_county: birth_country,
        birth_city: birth_city,
        activity_country: activity_country,
        current_live_city: current_live_city,
    }).then(() => User.create({
        user_id: user_uuid,
        user_login_id: user_login_id,
        user_email: user_email,
        user_password: bcrypt.hashSync(user_password, 10),
        human_id: human_uuid
    })).then(() => {
        util.controllerResult(res, 200, {
            user_login_id: user_login_id,
            user_email: user_email,
            age: age,
            birthday: birthday,
            real_name: real_name,
            birth_county: birth_country,
            birth_city: birth_city,
            activity_country: activity_country,
            current_live_city: current_live_city
        });
    });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    User.findByPk(req.params.id).then(data => {
        util.controllerResult(res, 200, data);
    })
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    User.findAll().then(data => {
        util.controllerResult(res, 200, data);
    });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    util.controllerResult(res, 200);
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then(() => User.destroy({
            where: { user_id: req.params.id }
        }));

    util.controllerResult(res);
});