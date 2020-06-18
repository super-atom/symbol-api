import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/utils.index';
import { User } from '../models/entities/User';
import { Profile } from '../models/entities/Profile';
import { CaseElement } from '../models/entities/CaseElement';
import { Publication } from '../models/entities/Publication';
import { CaseConfiguration } from '../models/entities/CaseConfiguration';
import { ErrorHandler } from '../utils/errorHandler';

export const createCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const { profiles, case_element_name, case_element_description, case_element_occurred_date } = req.body;
    const case_element_id = uuidv4();
    const publication_id = uuidv4();

    Publication.create({
        publication_id,
        user_id,
    });

    CaseElement.create({
        case_element_id,
        publication_id,
        case_element_name,
        case_element_description,
        case_element_occurred_date
    });

    profiles.forEach(el => {
        Profile.findAll({ where: { activity_name: el } })
            .then(data => CaseConfiguration.create({
                profile_id: data[0].dataValues.profile_id,
                case_element_id
            }))
            .catch(e => new ErrorHandler(400, "해당 프로필을 찾을 수 없습니다!"));
    });

    util.controllerResult(res, 200);
});

export const getCaseElements = catchAsync(async (req: Request, res: Response) => {
    CaseElement.findAll().then(data => {
        util.controllerResult(res, 200, data);
    });
});

export const getCaseElement = catchAsync(async (req: Request, res: Response) => {
    CaseElement.findByPk(req.params.id).then(data => {
        util.controllerResult(res, 200, data);
    })
});

export const updateCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    CaseElement.findByPk(id)
        .then(() => Profile.update(
            {

            },
            {
                where: { case_element_id: id }
            }));
    util.controllerResult(res, 200);
});

export const deleteCaseElement = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    Profile.findByPk(id)
        .then(() => User.destroy({
            where: { case_element_id: id }
        }));

    util.controllerResult(res);
});