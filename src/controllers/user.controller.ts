import { Request, Response } from 'express';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/index';
import { User } from '../models/entity/User';
import { Profile } from '../models/entity/Profile';
import { Human } from '../models/entity/Human';
import { InfoDocument } from '../models/entity/InfoDocument';
import { Publication } from '../models/entity/Publication';
import { ProfileTypeRule } from '../rules/type.rule';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const { user_login_id, user_email, user_password, gender, age, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, profile_type } = req.body;
    const profile_id = uuidv4();
    const human_id = uuidv4();
    const user_id = uuidv4();
    const publication_id = uuidv4();

    Human.create({
        human_id,
        gender,
        age,
        birthday,
        real_name,
        birth_country,
        birth_city,
        activity_country,
        current_live_city,
    });

    User.create({
        user_id,
        human_id,
        user_login_id,
        user_email,
        user_password: bcrypt.hashSync(user_password, 10),
    });

    Publication.create({
        publication_id,
        user_id
    });

    Profile.create({
        profile_id,
        human_id,
        publication_id,
        profile_type: ProfileTypeRule.User,
        activity_name: user_login_id
    });

    InfoDocument.create({
        profile_id
    });

    util.controllerResult(res, 200, {
        user_login_id,
        user_email,
        age,
        birthday,
        real_name,
        birth_country,
        birth_city,
        activity_country,
        current_live_city
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
    const { user_type, user_email, user_password } = req.body;
    const { id } = req.params;

    User.findByPk(id)
        .then(() => User.update(
            {
                user_type,
                user_email,
                user_password: bcrypt.hashSync(user_password, 10)
            },
            {
                where: { user_id: id }
            }));
    util.controllerResult(res, 200);
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    User.findByPk(id)
        .then(() => User.destroy({
            where: { user_id: id }
        }));

    util.controllerResult(res);
});