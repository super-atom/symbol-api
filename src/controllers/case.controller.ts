import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Request, Response, NextFunction, AsyncReturnType } from './../types/types.index';
import { Human, Profile, CaseElement, Publication, CaseConfiguration } from '../models/entities/entities.index';
import { getQueryUnitRule, PublicationTypeRule } from '../rules/rules.index';

async function getCaseElementAttributes(req: Request): Promise<object> {
    const {
        profiles,
        caseElements,
        case_element_name,
        case_element_description,
        case_element_occurred_date,
        gender,
        birthday,
        real_name,
        birth_country,
        birth_city,
        activity_country,
        current_live_city,
        activity_name,
        native_activity_name,
        profile_description,
        profile_type,
        is_hide,
        is_delete,
        is_published,
        publication_type = PublicationTypeRule.CaseElement
    } = req.body;

    // TODO: USING AJV pacakge

    return {
        profiles, caseElements, case_element_name, case_element_description, case_element_occurred_date, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, activity_name, native_activity_name, profile_description, profile_type, publication_type, is_hide, is_delete, is_published
    }
}

export async function validateCaseElement(req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> {
    const input: AsyncReturnType<any> = await getCaseElementAttributes(req).then(data => { return data });
    const { profiles, case_element_name, case_element_description, case_element_occurred_date, gender, birthday, real_name, birth_country, birth_city, activity_country, current_live_city, activity_name, native_activity_name, profile_description, profile_type, publication_type, is_hide, is_delete, is_published } = input;

    const schemaValidations = [
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
        }),
        CaseElement.schemaValidation({
            case_element_name,
            case_element_description,
            case_element_occurred_date
        }),
        Publication.schemaValidation({
            publication_type,
            is_hide,
            is_delete,
            is_published
        })
    ];

    const schemaValidationResults: [] = [];
    schemaValidations.forEach(e => {
        if (e.error) schemaValidationResults.push(e.error)
    });

    const isValid = utils.isEmptyData(schemaValidationResults);

    if (isValid === false) {
        utils.controllerResult(res, 400, schemaValidationResults, "유효성 검증 불통과");
    }
    else {
        const notExistProfiles: Array<string> = [];

        if (!utils.isEmptyData(profiles)) {
            const profilesData: AsyncReturnType<any> = await Profile
                .findAll({ where: { activity_name: profiles } })
                .then(data => { return data });

            profiles.forEach((data: string, index: number) => {
                if (utils.isEmptyData(profilesData[index])) {
                    notExistProfiles.push(data);
                }
            });
        }

        if (utils.isEmptyData(notExistProfiles) === false) {
            utils.controllerResult(res, 400, null, notExistProfiles + " 프로필을 찾을 수 없습니다.");
        } else {
            return next();
        }
    }
};

export const createCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input: any = await getCaseElementAttributes(req).then(data => { return data });
    const { profiles, case_element_name, case_element_description, case_element_occurred_date, publication_type } = input;
    const publication_id = uuidv4();
    const case_element_id = uuidv4();

    const caseElement: AsyncReturnType<any> = await CaseElement.findAll({
        where: {
            [Op.and]: [
                { case_element_name },
                { case_element_occurred_date }
            ]
        }
    }).then(data => { return data });

    if (utils.isEmptyData(caseElement) === false) {
        utils.controllerResult(res, 400, null, "사건 중복");
    } else {
        const publication: AsyncReturnType<any> = await Publication.create({
            publication_type,
            publication_id,
            user_id,
        });

        const case_element: AsyncReturnType<any> = await CaseElement.create({
            case_element_id,
            publication_id,
            case_element_name,
            case_element_description,
            case_element_occurred_date
        });

        const profilesData: AsyncReturnType<any> = await Profile
            .findAll({ where: { activity_name: profiles } })
            .then(data => { return data });

        Promise
            .all([publication, case_element])
            .then(() => profiles.forEach((data: string, index: number) => {
                CaseConfiguration.create({
                    case_configuration_id: uuidv4(),
                    profile_id: profilesData[index].profile_id,
                    case_element_id
                })
            }))
            .finally(() => utils.controllerResult(res, 200));
    }
});

export const getCaseElements = catchAsync(async (req: Request, res: Response) => {
    const { profile, page = 0, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;

    let sql;
    if (profile) sql = { where: { 'profile_id': profile } }
    const profileData: AsyncReturnType<any> = await Profile.findAll(sql);

    if (utils.isEmptyData(profileData)) {
        utils.controllerResult(res, 400, null, "프로필이 존재하지 않습니다.");
    } else {
        const data: AsyncReturnType<any> = await CaseElement.findAndCountAll(
            utils.paginate(
                page,
                limit,
                {
                    include: [Publication],
                    order: [[sortBy, order]]
                },
            )
        ).then(data => { return data });

        if (utils.isEmptyData(data)) {
            utils.controllerResult(res, 400);
        } else {
            utils.controllerResult(res, 200, data);
        }
    }
});

export const getCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { id, page = '0', limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;

    let sql;
    if (id) sql = { where: { 'profile_id': id } }
    const caseElement: AsyncReturnType<any> = await CaseElement.findAll(sql);

    if (utils.isEmptyData(caseElement)) {
        utils.controllerResult(res, 400, null, "사건이 존재하지 않습니다.");
    } else {
        const data: AsyncReturnType<any> = await CaseElement.findAndCountAll(
            utils.paginate(
                page,
                limit,
                {
                    include: [Publication],
                    order: [[sortBy, order]]
                },
            )
        ).then(data => { return data });

        if (utils.isEmptyData(data)) {
            utils.controllerResult(res, 400);
        } else {
            utils.controllerResult(res, 200, data);
        }
    }
});

export const updateCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { id, } = req.params;
    const input: AsyncReturnType<any> = await getCaseElementAttributes(req).then(data => { return data });
    const { case_element_name, case_element_description, case_element_occurred_date, is_hide, is_delete, is_published, profiles } = input;

    const caseElement: AsyncReturnType<any> = await CaseElement.findByPk(id)
        .then(() => CaseElement.update(
            {
                case_element_name,
                case_element_description,
                case_element_occurred_date,
            },
            {
                where: { case_element_id: id }
            }));

    const caseConfiguration: AsyncReturnType<any> = await CaseConfiguration.destroy(
        { case_element_id: caseElement.case_element_id },
    );

    const publication: AsyncReturnType<any> = await Publication.update(
        { is_hide, is_delete, is_published },
        { where: { case_element_id: caseElement.case_element_id } }
    );

    const profilesData: AsyncReturnType<any> = await Profile
        .findAll({ where: { activity_name: profiles } })
        .then(data => { return data });

    Promise
        .all([caseElement, caseConfiguration, publication])
        .then(() => profiles.forEach((data, index) => {
            CaseConfiguration.create({
                case_configuration_id: uuidv4(),
                profile_id: profilesData[index].profile_id,
                case_element_id
            })
        }))
        .finally(() => utils.controllerResult(res, 200, {
            case_element_name,
            case_element_description,
            case_element_occurred_date
        }));

    if (utils.isEmptyData(caseElement)) {
        utils.controllerResult(res, 400, null, "케이스를 찾을 수 없습니다.");
    }
    else {
        utils.controllerResult(res, 200);
    }
});

export const deleteCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const caseElement: any = await CaseElement.findByPk(id).then(data => { return data });

    if (utils.isEmptyData(caseElement)) {
        utils.controllerResult(res, 400, null, "케이스를 찾을 수 없습니다.");
    }
    else {
        Publication.update({ is_delete: 1 }, { where: { publication_id: caseElement.publication_id } });
        utils.controllerResult(res, 200);
    }
});