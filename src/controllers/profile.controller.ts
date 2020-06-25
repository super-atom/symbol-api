import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/utils.index';
import { User } from '../models/entities/User';
import { Profile } from '../models/entities/Profile';
import { InfoDocument } from '../models/entities/InfoDocument';
import { Publication } from '../models/entities/Publication';
import { Human } from '../models/entities/Human';
import { ProfileTypeRule } from '../rules/type.rule';

export const createProfile = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const { gender, age, birthday, activity_name, real_name, birth_country, birth_city, activity_country, current_live_city, native_activity_name, profile_description } = req.body;
    const profile_type = ProfileTypeRule.User;

    const human_id = uuidv4();
    const profile_id = uuidv4();
    const publication_id = uuidv4();

    const schemaValidation = [
        Human.schemaValidation({
            gender,
            birthday,
            real_name,
            birth_country,
            birth_city,
            activity_country,
            current_live_city
        }),
        Profile.schemaValidation({
            activity_name,
            native_activity_name,
            profile_description,
            profile_type
        })
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
        await Profile.findAll({
            include: [{
                model: Human,
                attributes: ['birthday', 'activity_country'],
            }],
            where: { activity_name }
        }).then(data => {
            if (!util.isEmptyObject(data)) {
                util.controllerResult(res, 400, null, "동일인물이 이미 존재합니다.");
            }
            else {
                const human = Human.create({
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

                const publication = Publication.create({
                    publication_id,
                    user_id
                });

                const profile = Profile.create({
                    profile_id,
                    human_id,
                    publication_id,
                    profile_type,
                    activity_name
                });

                const info_document = InfoDocument.create({
                    profile_id
                });

                Promise.race([human, publication, profile, info_document])
                    .finally(() => util.controllerResult(res, 200, {
                        activity_name,
                        age,
                        birthday,
                        real_name,
                        birth_country,
                        birth_city,
                        activity_country,
                        current_live_city
                    }));
            }
        });
    }
});

export const getProfiles = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = 10, order = 'ASC', keyword = 'createdAt' } = req.query;

    const data = await Profile.findAndCountAll(util.paginate(
        page,
        limit,
        {
            include: [Publication],
            order: [[keyword, order]]
        }
    )).then(data => { return data });

    if (data === null) {
        util.controllerResult(res, 400, null, "데이터를 찾을 수 없습니다.")
    }
    else {
        util.controllerResult(res, 200, data);
    }
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await Profile.findOne({
        where: { profile_id: id },
        include: [Publication]
    }).then(data => { return data });

    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        util.controllerResult(res, 200, data);
    }
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { profile_description, activity_name, native_activity_name } = req.body;
    const { id } = req.params;
    const profile_type = ProfileTypeRule.User;

    const data = await Profile.findByPk(id)
        .then(() => Profile.update(
            {
                profile_type,
                profile_description,
                activity_name,
                native_activity_name
            },
            {
                where: { profile_id: id }
            }));
    util.controllerResult(res, 200, data);
});

export const deleteProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await Profile.findByPk(id).then(data => { return data });
    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        Profile.update({ is_delete: 1 }, { where: { profile_id: id } });
        util.controllerResult(res, 200, data);
    }
});