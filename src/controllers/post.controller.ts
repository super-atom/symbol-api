import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Request, Response, NextFunction, AsyncReturnType } from './../types/types.index';
import { PostTypeRule, PublicationTypeRule, getQueryUnitRule } from '../rules/rules.index';
import { Post, PostVideo, Profile, Publication, CaseElement, CaseConfiguration } from '../models/entities/entities.index';

async function getPostAttributes(req: Request): Promise<object> {
    const {
        case_element_id,
        post_type,
        publication_type
    } = req.body;

    // TODO: USING AJV pacakge

    return {
        post_type, case_element_id, publication_type
    }
}

export async function validatePost(req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> {
    const input: AsyncReturnType<any> = await getPostAttributes(req).then(data => { return data });
    const { case_element_id, post_type, publication_type } = input;

    const validResult = utils.modelSchemaValidator([
        CaseElement.schemaValidation({
            case_element_id
        }),
        Post.schemaValidation({
            post_type,
        }),
    ]);

    if (!utils.isEmptyData(validResult)) {
        utils.controllerResult(res, 400, validResult, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const getPostsById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: AsyncReturnType<any>
        = await Post
            .findOne({
                where: { post_id: id },
                include: [Publication, CaseElement],
            })
            .then(data => { return data });

    utils.getControllerResult(res, data);
});

export const getPostsByCaseElementId = catchAsync(async (req: Request, res: Response) => {
    const { caseElementId } = req.query;
    const data: AsyncReturnType<any>
        = await Post
            .findAll({
                where: { case_element_id: caseElementId },
                include: [Publication],
            })
            .then(data => { return data });

    utils.getControllerResult(res, data);
});
