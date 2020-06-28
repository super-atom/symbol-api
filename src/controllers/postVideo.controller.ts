import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { PostTypeRule, PostVideoTypeRule } from '../rules/type.rule';
import { Post, PostVideo, Profile, Publication, CaseElement, CaseConfiguration } from '../models/entities/entities.index';
import { getQueryUnitRule } from '../rules/unit.rule';

async function getPostVideoAttributes(req: Request) {
    let { post_type, post_title, post_content, post_video_type, post_video_access_code, case_element_id } = req.body;

    // TODO: USING AJV pacakge

    return {
        post_type, post_title, post_content, post_video_type, post_video_access_code, case_element_id
    }
}

export async function validatePostVideo(req: Request, res: Response, next: NextFunction): Promise<T> {
    const input = await getPostVideoAttributes(req).then(data => { return data });
    const { post_title, post_content, post_video_access_code, case_element_id, post_video_type } = input;
    let { post_type = PostTypeRule.Video } = input;
    let { profile } = req.body;

    const schemaValidations = [
        CaseElement.schemaValidation({
            case_element_id
        }),
        Profile.schemaValidation({
            activity_name: profile,
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

    let schemaValidationResults = [];
    schemaValidations.forEach(e => {
        if (e.error) schemaValidationResults.push(e.error)
    });
    const isValid = utils.isEmptyData(schemaValidationResults);

    console.log("??", schemaValidationResults);

    if (isValid === false) {
        utils.controllerResult(res, 400, schemaValidationResults, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const createPostVideo = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input = await getPostVideoAttributes(req).then(data => { return data });
    const { case_element_id, post_title, post_content, post_video_access_code, post_video_type } = input;
    let { profile } = req.body;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_video_id = uuidv4();
    let isFinalCheck = false;

    const profileData = await Profile.findOne({ where: { activity_name: profile } })
        .then(data => { return data });

    // Final Check
    if (utils.isEmptyData(profileData)) {
        utils.controllerResult(res, 400, null, profile + " 프로필을 찾을 수 없습니다.");
    }
    else {
        const caseElement = await CaseElement.findOne({ where: { case_element_id } });
        const isExistCaseElement = caseElement === null ? false : true;

        if (isExistCaseElement === false) {
            utils.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
        } else {
            const caseConf = await CaseConfiguration.findOne({
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

        const publication = await Publication.create({
            publication_id,
            user_id
        });

        const post = await Post.create({
            publication_id,
            profile_id,
            case_element_id,
            post_id,
            user_id,
            post_type,
            post_title,
            post_content
        });

        const postVideo = await PostVideo.create({
            post_id,
            post_video_id,
            post_video_type,
            post_video_access_code,
        });

        Promise.race([publication, post, postVideo])
            .finally(() => utils.controllerResult(res, 200));
    }
});

export const getPostVideos = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    let { profiles } = req.query;

    let sql = {
        include: {
            model: Post
        },
        order: [[sortBy, order]],
    };
    if (utils.isEmptyData(profiles) !== false) sql.include.where = { profile_id: profiles };

    const data = await PostVideo.findAndCountAll(sql = utils.paginate(
        page,
        limit,
        sql
    )).then(data => { return data });
    utils.controllerResult(res, 200, data);
});

export const getPostVideo = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await Post.findByPk(id)
        .then(data => { return data })
        .finally((data) => utils.controllerResult(res, 200, data));
    ;
});

export const updatePostVideo = catchAsync(async (req: Request, res: Response) => {
    const { post_title, post_content } = req.body;
    const { id } = req.params;

    const data = await Post.findByPk(id)
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

    const publication = await Post.findByPk(id)
        .then(data => { return data });

    if (publication === null) {
        utils.controllerResult(res, 400, null, "대상을 찾을 수 없습니다.");
    }
    else {
        const publication_id = publication.publication_id;
        const data = await Publication.update(
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