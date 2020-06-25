import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User, Profile, Human, InfoDocument, Publication } from '../models/entities/entities.index';
import * as util from '../utils/utils.index';
import { catchAsync } from '../utils/catchAsync';
import { ProfileTypeRule } from '../rules/type.rule';
import UserTypeRule from '../rules/type.rule';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const { user_login_id, user_email, user_password, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, } = req.body;
    const user_type = UserTypeRule.User;
    const profile_type = ProfileTypeRule.User;
    let { activity_name } = req.body;
    if (!activity_name) activity_name = user_login_id;

    const profile_id = uuidv4();
    const human_id = uuidv4();
    const user_id = uuidv4();
    const publication_id = uuidv4();

    const schemaValidation = [
        User.schemaValidation({
            user_type,
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
        Profile.schemaValidation({ profile_type, activity_name })
    ];

    const schemaValidationResult: object = [];
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
                if (!util.isEmptyObject(data)) {
                    util.controllerResult(res, 400, null, "아이디 또는 이메일 중복");
                }
                else {
                    const human = Human.create({
                        human_id,
                        gender,
                        birthday,
                        real_name,
                        birth_country,
                        birth_city,
                        activity_country,
                        current_live_city,
                    })

                    const user = User.create({
                        user_id,
                        human_id,
                        user_type,
                        user_login_id,
                        user_email,
                        user_password: bcrypt.hashSync(user_password, 10),
                    })

                    const publication = Publication.create({
                        publication_id,
                        user_id
                    })

                    const profile = Profile.create({
                        profile_id,
                        human_id,
                        publication_id,
                        activity_name,
                        profile_type
                    });

                    const info_document = InfoDocument.create({
                        profile_id
                    });

                    Promise.race([human, user, publication, profile, info_document])
                        .finally(() => util.controllerResult(res, 200, {
                            user_login_id,
                            user_email,
                            birthday,
                            real_name,
                            birth_country,
                            birth_city,
                            activity_country,
                            current_live_city
                        }));
                }
            })
    }
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = 10, order = 'ASC', keyword = 'createdAt' } = req.query;

    const data = await User.findAndCountAll(util.paginate(
        page,
        limit,
        {
            where: { [Op.not]: [{ is_delete: 1 }] },
            order: [[keyword, order]]
        }
    )).then(data => { return data });

    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        util.controllerResult(res, 200, data);
    }
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await User.findOne({
        where: { user_id: id },
        include: [Human]
    }).then(data => { return data });

    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        const { user_id, user_type, user_login_id, user_email, user_contribute_point, is_delete, createdAt, updatedAt, human } = data;
        util.controllerResult(res, 200, { user_id, user_type, user_login_id, user_email, user_contribute_point, is_delete, createdAt, updatedAt, human });
    }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { user_email, is_delete } = req.body;
    const { id } = req.params;
    const data = await User.findOne({
        where: { user_id: id },
        include: [Human]
    }).then(data => { return data });

    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    } else {
        const data = await User.update(
            { user_email, is_delete, },
            { where: { user_id: id } }
        );

        if (data === null) {
            util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
        }
        else {
            util.controllerResult(res, 200, data);
        }
    }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id).then(data => { return data });
    if (user === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        User.update({ is_delete: 1 }, { where: { user_id: id } });
        util.controllerResult(res, 200, user);
    }
});