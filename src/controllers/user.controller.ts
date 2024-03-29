import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { User, Profile, Human, InfoDocument, Publication } from '../models/entities/entities.index';
import * as utils from '../utils/utils.index';
import { catchAsync } from '../utils/catchAsync';
import { ProfileTypeRule, PublicationTypeRule, UserTypeRule } from '../rules/type.rule';
import { getQueryUnitRule } from '../rules/unit.rule';

async function getUserAttributes(req: Request): Promise<object> {
    const { user_login_id, user_email, user_password, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, user_type, profile_type, activity_name, is_delete, publication_type, user_contribute_point } = req.body;

    // TODO: USING AJV pacakge

    return {
        user_login_id, user_email, user_password, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, user_type, profile_type, activity_name, is_delete, publication_type, user_contribute_point
    }
}

export async function validateUser(req: Request, res: Response, next: NextFunction): Promise<NextFunction> {
    const input = await getUserAttributes(req).then(data => { return data });
    const { user_type, profile_type, activity_name, user_login_id, user_email, user_password, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, publication_type, user_contribute_point } = input;

    const schemaValidations = [
        User.schemaValidation({
            user_type,
            user_login_id,
            user_email,
            user_password,
            user_contribute_point
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
        Profile.schemaValidation({ profile_type, activity_name }),
        Publication.schemaValidation({ publication_type })
    ];

    let schemaValidationResults: object = [];
    schemaValidations.forEach(e => {
        if (e.error) schemaValidationResults.push(e)
    });
    const isValid = utils.isEmptyData(schemaValidationResults);

    if (isValid === false) {
        utils.controllerResult(res, 400, schemaValidationResults, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const input = await getUserAttributes(req).then(data => { return data });
    const { user_login_id, user_email, user_password, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city } = input;
    let { user_type, profile_type, activity_name, publication_type } = input;

    const profile_id = uuidv4();
    const human_id = uuidv4();
    const user_id = uuidv4();
    const publication_id = uuidv4();

    user_type = UserTypeRule.User;
    profile_type = ProfileTypeRule.User;
    publication_type = PublicationTypeRule.Profile;
    if (utils.isEmptyData(activity_name)) activity_name = user_login_id;

    const user = await User.findAll({ where: { [Op.or]: [{ user_login_id }, { user_email }] } }).then(data => { return data });

    if (!utils.isEmptyData(user)) {
        utils.controllerResult(res, 400, null, "아이디 또는 이메일 중복");
    }
    else {
        const human = await Human.create({
            human_id,
            gender,
            birthday,
            real_name,
            birth_country,
            birth_city,
            activity_country,
            current_live_city,
        })

        const user = await User.create({
            user_id,
            human_id,
            user_type,
            user_login_id,
            user_email,
            user_password: User.encryptPassword(user_password),
        })

        const publication = await Publication.create({
            publication_id,
            publication_type,
            user_id
        })

        const profile = await Profile.create({
            profile_id,
            human_id,
            publication_id,
            activity_name,
            profile_type
        });

        const info_document = await InfoDocument.create({
            profile_id
        });

        Promise
            .all([human, user, publication, profile, info_document])
            .finally(() => utils.controllerResult(res, 200));
    }
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;

    const data = await User.findAndCountAll(utils.paginate(
        page,
        limit,
        {
            where: { [Op.not]: [{ is_delete: 1 }] },
            order: [[sortBy, order]]
        }
    )).then(data => { return data });

    if (utils.isEmptyData(data)) {
        utils.controllerResult(res, 400, null);
    } else {
        utils.controllerResult(res, 200, data);
    }
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: { user_id: id },
        include: [Human]
    }).then(data => { return data });

    if (utils.isEmptyData(user)) {
        utils.controllerResult(res, 400, null)
    }
    else {
        const { user_type, user_login_id, user_email, user_contribute_point, is_delete, createdAt, updatedAt, human } = user;
        utils.controllerResult(res, 200, {
            user_type, user_login_id, user_email, user_contribute_point, is_delete, createdAt, updatedAt, human
        });
    }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const input = await getUserAttributes(req).then(data => { return data });
    const { user_email, is_delete, activity_name, profile_type, user_contribute_point } = input;
    const { id } = req.params;
    let isFinalCheck = false;

    const user = await User.findOne({
        where: { user_id: id },
        include: [Human]
    }).then(user => { return user });

    // FinalCheck
    if (utils.isEmptyData(user)) {
        utils.controllerResult(res, 400, null, "유저를 찾을 수 없습니다");
    } else {
        const profile = await Profile.findOne({
            where: { human_id: user.human.human_id }
        });

        if (utils.isEmptyData(profile)) {
            utils.controllerResult(res, 400, null, "프로필을 찾을 수 없습니다");
        } else {
            isFinalCheck = true;
        }
    }

    if (isFinalCheck) {
        await User.update(
            { user_email, is_delete, user_contribute_point },
            { where: { user_id: id } }
        );

        await Profile.update(
            { activity_name, profile_type },
            { where: { human_id: user.human.human_id } }
        );

        utils.controllerResult(res, 200);
    }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id).then(data => { return data });

    if (utils.isEmptyData(user)) {
        utils.controllerResult(res, 400, null)
    }
    else {
        await User.update({ is_delete: 1 }, { where: { user_id: id } });
        utils.controllerResult(res, 200);
    }
});