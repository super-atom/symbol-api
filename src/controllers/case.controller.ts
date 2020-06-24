import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/utils.index';
import { Profile, CaseElement, Publication, CaseConfiguration } from '../models/entities/entities.index';

export const createCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const { profiles, case_element_name, case_element_description, case_element_occurred_date } = req.body;
    const publication_id = uuidv4();
    const case_element_id = uuidv4();

    const schemaValidationResult = CaseElement.schemaValidation({
        case_element_name,
        case_element_description,
        case_element_occurred_date
    });

    const isValid = schemaValidationResult.error ? false : true;

    if (!isValid) {
        util.controllerResult(res, 400, schemaValidationResult.error, "유효성 검증 불통과");
    }
    else {
        const profilesData = await Profile.findAll({ where: { activity_name: profiles } })
            .then(data => { return data });

        let notExistProfiles: Array<string> = [];
        profiles.forEach((data, index) => {
            if (profilesData[index] === undefined) {
                notExistProfiles.push(data);
            }
        });
        if (!util.isEmptyObject(notExistProfiles)) {
            util.controllerResult(res, 400, null, notExistProfiles + " 프로필을 찾을 수 없습니다.");
        }
        else {
            const caseElement = await CaseElement.findAll({
                where: {
                    [Op.and]: [
                        { case_element_name },
                        { case_element_occurred_date }
                    ]
                }
            }).then(data => { return data });

            if (!util.isEmptyObject(caseElement)) {
                util.controllerResult(res, 400, null, "사건 중복");
            } else {
                const publication = await Publication.create({
                    publication_id,
                    user_id,
                });

                const case_element = await CaseElement.create({
                    case_element_id,
                    publication_id,
                    case_element_name,
                    case_element_description,
                    case_element_occurred_date
                });

                Promise.race([publication, case_element])
                    .then(() => profiles.forEach((data, index) => {
                        CaseConfiguration.create({
                            case_configuration_id: uuidv4(),
                            profile_id: profilesData[index].profile_id,
                            case_element_id
                        })
                    }))
                    .finally(() => util.controllerResult(res, 200, {
                        case_element_name,
                        case_element_description,
                        case_element_occurred_date
                    }));
            }
        }
    }
});

export const getCaseElements = catchAsync(async (req: Request, res: Response) => {
    const { profile, page = 0, limit = 10, order = 'ASC', keyword = 'createdAt' } = req.query;

    const profileData = await Profile.findAll({
        where: { 'profile_id': profile }
    });

    if (profileData === null) {
        util.controllerResult(res, 400, null, "프로필이 존재하지 않습니다.");
    } else {
        const data = await CaseElement.findAndCountAll(
            util.paginate(
                page,
                limit,
                {
                    include: [Publication],
                    order: [[keyword, order]]
                },
            )
        ).then(data => { return data });

        if (data === null) {
            util.controllerResult(res, 400, null, "사건이 존재하지 않습니다.");
        } else util.controllerResult(res, 200, data);
    }
});

export const getCaseElement = catchAsync(async (req: Request, res: Response) => {
});

export const updateCaseElement = catchAsync(async (req: Request, res: Response) => {
    util.controllerResult(res, 200);
});

export const deleteCaseElement = catchAsync(async (req: Request, res: Response) => {
    util.controllerResult(res);
});