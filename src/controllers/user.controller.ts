import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User, Profile, Human, InfoDocument, Publication } from '../models/entities/entities.index';
import * as util from '../utils/utils.index';
import { catchAsync } from '../utils/catchAsync';
import { ProfileTypeRule } from '../rules/type.rule';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const { user_login_id, user_email, user_password, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, } = req.body;
    let { activity_name } = req.body;
    if (!activity_name) activity_name = user_login_id;

    const profile_id = uuidv4();
    const human_id = uuidv4();
    const user_id = uuidv4();
    const publication_id = uuidv4();

    const schemaValidation = [
        User.schemaValidation({
            user_login_id,
            user_email,
            user_password
        }),
        Human.schemaValidation({
            gender,
            birthday,
            real_name,
            birth_country,
            birth_city,
            activity_country,
            current_live_city
        }),
        Profile.schemaValidation({ activity_name })
    ];

    let schemaValidationResult = [];
    schemaValidation.forEach(e => {
        if (e.error) schemaValidationResult.push(e.error)
    });
    const isValid = util.isEmptyObject(schemaValidationResult);

    if (!isValid) {
        util.controllerResult(res, 400, schemaValidationResult, "유효성 검증 불통과");
    }
    else {
        await User.findAll({ where: { [Op.or]: [{ user_login_id }, { user_email }] } })
            .then(data => {
                if (!util.isEmptyObject(data)) util.controllerResult(res, 400, null, "아이디 또는 이메일 중복");
                else {
                    console.log(isValid, "유효성 검증 통과");
                    Human.create({
                        human_id,
                        gender,
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
                        activity_name,
                        profile_type: ProfileTypeRule.User
                    });

                    InfoDocument.create({
                        profile_id
                    });
                }
            })
    }

    util.controllerResult(res, 200, {
        user_login_id,
        user_email,
        birthday,
        real_name,
        birth_country,
        birth_city,
        activity_country,
        current_live_city
    })
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id).then(data => { return data });
    if (user === null) {
        util.controllerResult(res, 400, null, "유저를 찾을 수 없습니다.");
    }
    else util.controllerResult(res, 200, user);
});

export const getUsers = catchAsync(async (res: Response) => {
    const user = await User.findAll({ where: { [Op.not]: [{ is_delete: 1 }] } })
        .then(data => { return data });

    if (user === null) {
        util.controllerResult(res, 400, null, "유저를 찾을 수 없습니다.")
    }
    else util.controllerResult(res, 200, user);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { user_email, is_delete } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id).then(data => { return data });

    if (user === null) {
        util.controllerResult(res, 400, null, "유저를 찾을 수 없습니다.")
    } else {
        await User.update(
            { user_email, is_delete, },
            { where: { user_id: id } }
        );
        util.controllerResult(res, 200);
    }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id).then(data => { return data });
    if (user === null) {
        util.controllerResult(res, 400, null, "유저를 찾을 수 없습니다.")
    }
    else {
        User.update({ is_delete: 1 }, { where: { user_id: id } });
        util.controllerResult(res, 200, user);
    }
});