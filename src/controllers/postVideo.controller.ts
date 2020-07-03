import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Request, Response, NextFunction, AsyncReturnType } from './../types/types.index';
import { PostTypeRule, PublicationTypeRule, getQueryUnitRule } from '../rules/rules.index';
import { Post, PostVideo, Profile, Publication, CaseElement, CaseConfiguration } from '../models/entities/entities.index';

async function getPostVideoAttributes(req: Request): Promise<object> {
    const {
        post_title,
        post_content,
        post_video_type,
        post_video_access_code,
        case_element_id,
        activity_name,
        post_type = PostTypeRule.Video,
        publication_type = PublicationTypeRule.PostVideo
    } = req.body;

    const { profile } = req.query;

    // TODO: USING AJV pacakge

    return {
        post_type, post_title, post_content, post_video_type, post_video_access_code, case_element_id, publication_type, activity_name, profile
    }
}

export async function validatePostVideo(req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> {
    const input: AsyncReturnType<any> = await getPostVideoAttributes(req).then(data => { return data });
    const { post_title, post_content, post_video_access_code, case_element_id, post_video_type, activity_name, post_type } = input;

    const schemaValidations = [
        CaseElement.schemaValidation({
            case_element_id
        }),
        Profile.schemaValidation({
            activity_name,
        }),
        Post.schemaValidation({
            post_type,
            post_title,
            post_content
        }),
        PostVideo.schemaValidation({
            post_video_type,
            post_video_access_code
        })
    ];

    const schemaValidationResults: [] = [];
    schemaValidations.forEach(e => {
        if (e.error) schemaValidationResults.push(e.error)
    });

    const isValid = utils.isEmptyData(schemaValidationResults);

    if (isValid === false) {
        utils.controllerResult(res, 400, schemaValidationResults, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const createPostVideo = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input: AsyncReturnType<any> = await getPostVideoAttributes(req).then(data => { return data });
    const { case_element_id, post_title, post_content, post_video_access_code, post_video_type, publication_type, activity_name, post_type } = input;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_video_id = uuidv4();
    let isFinalCheck = false;

    let sql;
    if (activity_name) sql = { where: { activity_name } };
    const profileData: AsyncReturnType<any> = await Profile.findOne(sql)
        .then(data => { return data });

    // Final Check
    if (utils.isEmptyData(profileData)) {
        utils.controllerResult(res, 400, null, "프로필을 찾을 수 없습니다.");
    }
    else {
        const caseElement: AsyncReturnType<any> = await CaseElement.findOne({ where: { case_element_id } });
        const isExistCaseElement = caseElement === null ? false : true;

        if (isExistCaseElement === false) {
            utils.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
        } else {
            const caseConf: AsyncReturnType<any> = await CaseConfiguration.findOne({
                where: { case_element_id }
            });
            const isEquelCaseConfAndProfile = (caseConf.profile_id === profileData.profile_id);

            if (utils.isEmptyData(caseConf)) {
                utils.controllerResult(res, 400, null, "해당 케이스 구성을 찾을 수 없습니다.");
            }
            else if (isEquelCaseConfAndProfile) {
                isFinalCheck = true;
            }
        }
    }

    if (isFinalCheck) {
        const profile_id = profileData.profile_id;

        const publication: AsyncReturnType<any> = await Publication.create({
            publication_id,
            publication_type,
            user_id
        });

        const post: AsyncReturnType<any> = await Post.create({
            publication_id,
            profile_id,
            case_element_id,
            post_id,
            user_id,
            post_type,
            post_title,
            post_content
        });

        const postVideo: AsyncReturnType<any> = await PostVideo.create({
            post_id,
            post_video_id,
            post_video_type,
            post_video_access_code,
        });

        Promise.all([publication, post, postVideo])
            .finally(() => utils.controllerResult(res, 200));
    }
});

export const getPostVideos = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    const { profiles } = req.query;

    let sql = {
        include: {
            model: Post
        },
        order: [[sortBy, order]],
    };

    if (utils.isEmptyData(profiles) !== false) {
        sql.include.where = { activity_name: profiles };
    }

    const data: AsyncReturnType<any> = await PostVideo.findAndCountAll(sql = utils.paginate(
        page,
        limit,
        sql
    )).then(data => { return data });
    utils.controllerResult(res, 200, data);
});

export const getPostVideo = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    const { id } = req.params;
    const data: AsyncReturnType<any> = await Post.findAndCountAll({
        where: {
            [Op.and]: [
                { profile_id: id },
                { post_type: PostTypeRule.Video }
            ]
        }
    }).then(data => { return data });


    if (utils.isEmptyData(data)) {
        utils.controllerResult(res, 400, null, "해당 프로필의 포스트를 찾을 수 없습니다.");
    } else {
        utils.controllerResult(res, 200, data);
    }
});

export const updatePostVideo = catchAsync(async (req: Request, res: Response) => {
    const { post_title, post_content } = req.body;
    const { id } = req.params;

    const data: AsyncReturnType<any> = await Post.findByPk(id)
        .then(() => Post.update(
            {
                post_title,
                post_content
            },
            {
                where: { post_id: id }
            }));

    if (data === null) {
        utils.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        utils.controllerResult(res, 200, data);
    }
});

export const deletePostVideo = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const publication: AsyncReturnType<any> = await Post.findByPk(id)
        .then(data => { return data });

    if (publication === null) {
        utils.controllerResult(res, 400, null, "대상을 찾을 수 없습니다.");
    }
    else {
        const publication_id = publication.publication_id;
        const data: AsyncReturnType<any> = await Publication.update(
            { is_delete: 1 },
            { where: { publication_id } }
        );

        if (data === null) {
            utils.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
        }
        else {
            utils.controllerResult(res, 200, data);
        }
    }
});