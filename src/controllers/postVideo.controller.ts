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

    // TODO: USING AJV pacakge

    return {
        post_type, post_title, post_content, post_video_type, post_video_access_code, case_element_id, publication_type, activity_name
    }
}

export async function validatePostVideo(req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> {
    const input: AsyncReturnType<any> = await getPostVideoAttributes(req).then(data => { return data });
    const { post_title, post_content, post_video_access_code, case_element_id, post_video_type, activity_name, post_type } = input;

    const validResult = utils.modelSchemaValidator([
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
    ]);

    if (!utils.isEmptyData(validResult)) {
        utils.controllerResult(res, 400, validResult, "유효성 검증 불통과");
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

    const profileData: AsyncReturnType<any>
        = await Profile
            .findOne({ where: { activity_name } })
            .then(data => { return data });

    // Final Check
    if (utils.isEmptyData(profileData)) {
        utils.controllerResult(res, 400, null, "데이터를 찾을 수 없습니다.");
    }
    else {
        const caseElement: AsyncReturnType<any>
            = await CaseElement
                .findOne({ where: { case_element_id } });
        const isExistCaseElement = caseElement === null ? false : true;

        if (isExistCaseElement === false) {
            utils.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
        } else {
            const caseConf: AsyncReturnType<any>
                = await CaseConfiguration
                    .findOne({
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

        const publication: AsyncReturnType<any>
            = await Publication
                .create({
                    publication_id,
                    publication_type,
                    user_id
                });

        const post: AsyncReturnType<any>
            = await Post
                .create({
                    publication_id,
                    profile_id,
                    case_element_id,
                    post_id,
                    user_id,
                    post_type,
                    post_title,
                    post_content
                });

        const postVideo: AsyncReturnType<any>
            = await PostVideo
                .create({
                    post_id,
                    post_video_id,
                    post_video_type,
                    post_video_access_code,
                });

        Promise.all([publication, post, postVideo])
            .finally(() => utils.controllerResult(res, 200));
    }
});

export const updatePostVideo = catchAsync(async (req: Request, res: Response) => {
    const input: AsyncReturnType<any> = await getPostVideoAttributes(req).then(data => { return data });
    const { post_title, post_content } = input;
    const { id } = req.params;

    const data: AsyncReturnType<any>
        = await Post
            .findByPk(id)
            .then(() => Post.update(
                {
                    post_title,
                    post_content
                },
                {
                    where: { post_id: id }
                }));

    if (utils.isEmptyData(data)) {
        utils.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        utils.controllerResult(res, 200, data);
    }
});

export const deletePostVideo = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const publication: AsyncReturnType<any>
        = await Post
            .findByPk(id)
            .then(data => { return data });

    if (utils.isEmptyData(publication)) {
        utils.controllerResult(res, 400, null, "대상을 찾을 수 없습니다.");
    }
    else {
        const publication_id = publication.publication_id;
        const data: AsyncReturnType<any>
            = await Publication
                .update(
                    { is_delete: 1 },
                    { where: { publication_id } }
                );

        if (utils.isEmptyData(data)) {
            utils.controllerResult(res, 400, null, "해당 프로필의 포스트를 찾을 수 없습니다.");
        } else {
            utils.controllerResult(res, 200, data);
        }
    }
});

export const getPostVideoById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: AsyncReturnType<any>
        = await PostVideo
            .findByPk(id)
            .then(data => { return data });

    utils.getControllerResult(res, data);
});

export const getPostVideoByPostId = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req.query;
    const data: AsyncReturnType<any>
        = await PostVideo
            .findOne({
                where: {
                    post_id: postId
                },
            })
            .then(data => { return data });

    utils.getControllerResult(res, data);
});

export const getPostVideosByProfileId = catchAsync(async (req: Request, res: Response) => {
    const { profileId, page = 1, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    const data: AsyncReturnType<any>
        = await Post
            .findAndCountAll(
                utils.paginate(
                    page,
                    limit,
                    {
                        where: {
                            [Op.and]: [
                                { profile_id: profileId },
                                { post_type: PostTypeRule.Video }
                            ]
                        },
                        order: [[sortBy, order]]
                    })
            )
            .then(data => { return data });

    utils.getControllerResult(res, data);
});

export const getPostVideosByActivityNames = catchAsync(async (req: Request, res: Response) => {
    const { page = 1, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    const { activityNames } = req.query;
    const sql = {
        include: {
            model: Post
        },
        order: [[sortBy, order]],
    };

    if (utils.isEmptyData(activityNames) !== false) {
        sql.include.where = { activity_name: activityNames };
    }

    const data: AsyncReturnType<any>
        = await PostVideo
            .findAndCountAll(utils.paginate(
                page,
                limit,
                sql
            ))
            .then(data => { return data });

    utils.getControllerResult(res, data);
});
