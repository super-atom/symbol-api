import { Request, Response } from 'express';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/index';
import { User } from '../models/entity/User';
import { Profile } from '../models/entity/Profile';
import { InfoDocument } from '../models/entity/InfoDocument';
import { Publication } from '../models/entity/Publication';
import { Human } from '../models/entity/Human';
import { ProfileTypeRule } from '../rules/type.rule';

export const createProfile = catchAsync(async (req: Request, res: Response) => {
    const { user_id, gender, age, birthday, activity_name, real_name, birth_country, birth_city, activity_country, current_live_city } = req.body;
    req.body.user_id = req.user.id;
    const human_id = uuidv4();
    const profile_id = uuidv4();
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

    Publication.create({
        publication_id,
        user_id
    });

    Profile.create({
        profile_id,
        human_id,
        publication_id,
        profile_type: ProfileTypeRule.User,
        activity_name
    });

    InfoDocument.create({
        profile_id
    });

    util.controllerResult(res, 200, {
        activity_name,
        age,
        birthday,
        real_name,
        birth_country,
        birth_city,
        activity_country,
        current_live_city
    });
});

export const getProfiles = catchAsync(async (req: Request, res: Response) => {
    Profile.findAll().then(data => {
        util.controllerResult(res, 200, data);
    });
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
    Profile.findByPk(req.params.id).then(data => {
        util.controllerResult(res, 200, data);
    })
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { profile_type } = req.body;
    const { id } = req.params;

    Profile.findByPk(id)
        .then(() => Profile.update(
            {
                profile_type,
            },
            {
                where: { profile_id: id }
            }));
    util.controllerResult(res, 200);
});

export const deleteProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    Profile.findByPk(id)
        .then(() => User.destroy({
            where: { profile_id: id }
        }));

    util.controllerResult(res);
});