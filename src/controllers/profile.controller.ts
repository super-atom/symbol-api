import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Profile, InfoDocument, Publication, Human } from '../models/entities/entities.index';
import { ProfileTypeRule, PublicationTypeRule, getQueryUnitRule } from '../rules/rules.index';
import { Request, Response, NextFunction, AsyncReturnType } from './../types/types.index';
import { logStorage } from '../database/logStorage';

async function getProfileAttributes(req: Request): Promise<object> {
    const {
        profile_type,
        gender,
        birthday,
        activity_name,
        real_name,
        birth_country,
        birth_city,
        activity_country,
        current_live_city,
        native_activity_name,
        profile_description,
        publication_type = PublicationTypeRule.Profile
    } = req.body;

    // TODO: USING AJV pacakge

    return {
        profile_type, gender, birthday, activity_name, real_name, birth_country, birth_city, activity_country, current_live_city, native_activity_name, profile_description, publication_type
    }
};

export async function validateProfile(req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> {
    const input: AsyncReturnType<any> = await getProfileAttributes(req).then(data => { return data });
    const { gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, native_activity_name, profile_description, profile_type, activity_name } = input;

    const validResult = utils.modelSchemaValidator([
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
    ]);

    if (!utils.isEmptyData(validResult)) {
        utils.controllerResult(res, 400, validResult, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const createProfile = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input: any = await getProfileAttributes(req).then(data => { return data });
    const { gender, birthday, activity_name, real_name, birth_country, birth_city, activity_country, current_live_city, native_activity_name, profile_description, publication_type, profile_type = ProfileTypeRule.User } = input;

    const human_id = uuidv4();
    const profile_id = uuidv4();
    const publication_id = uuidv4();

    const profiles: AsyncReturnType<any>
        = await Profile.findAll({
            include: [{
                model: Human,
                attributes: ['birthday'],
                where: { birthday }
            }],
            where: { activity_name }
        })
            .then(data => { return data });

    if (!utils.isEmptyData(profiles)) {
        utils.controllerResult(res, 400, null, "동일인물이 이미 존재합니다.");
    }
    else {
        const human: AsyncReturnType<any> = await Human.create({
            human_id,
            gender,
            birthday,
            real_name,
            birth_country,
            birth_city,
            activity_country,
            current_live_city,
        });

        const publication: AsyncReturnType<any> = await Publication.create({
            publication_id,
            publication_type,
            user_id
        });

        const profile: AsyncReturnType<any> = await Profile.create({
            profile_id,
            human_id,
            publication_id,
            profile_type,
            activity_name,
            native_activity_name,
            profile_description
        });

        const info_document: AsyncReturnType<any> = await InfoDocument.create({
            profile_id
        });

        Promise
            .all([human, publication, profile, info_document])
            .finally(() => utils.controllerResult(res, 200, {
                activity_name,
                birthday,
                real_name,
                birth_country,
                birth_city,
                activity_country,
                current_live_city
            }));
    }
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const input: AsyncReturnType<any> = await getProfileAttributes(req).then(data => { return data });
    const { profile_type, profile_description, activity_name, native_activity_name } = input;

    const user: AsyncReturnType<any>
        = await Profile
            .findByPk(id)
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

    if (utils.isEmptyData(user)) {
        utils.controllerResult(res, 400, null, "프로필을 찾을 수 없습니다.")
    }
    else {
        utils.controllerResult(res, 200);
    }
});

export const deleteProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile: AsyncReturnType<any>
        = await Profile
            .findByPk(id)
            .then(data => { return data });

    if (utils.isEmptyData(profile)) {
        utils.controllerResult(res, 400, null, "프로필을 찾을 수 없습니다.")
    }
    else {
        Publication.update({ is_delete: 1 }, { where: { publication_id: profile.publication_id } });
        utils.controllerResult(res, 200);
    }
});

export const getProfiles = catchAsync(async (req: Request, res: Response) => {
    const { page = 1, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    const { activity_name } = req.query;

    const sql: any = {
        include: [Human, Publication],
        order: [[sortBy, order]]
    };

    if (activity_name) {
        sql.where = { activity_name };
    }

    const data: AsyncReturnType<any>
        = await Profile.findAndCountAll(
            utils.paginate(
                Number(page),
                Number(limit),
                sql
            ))
            .then(data => { return data });

    utils.getControllerResult(res, data);
});

export const getProfileById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: AsyncReturnType<any>
        = await Profile
            .findOne({
                where: { profile_id: id },
                include: [Human, Publication]
            })
            .then(data => { return data });

    utils.getControllerResult(res, data);
});
