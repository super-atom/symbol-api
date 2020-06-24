import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/utils.index';
import { PostTypeRule } from '../rules/type.rule';
import { Post, PostVideo, Profile, Publication, CaseElement } from '../models/entities/entities.index';
import { when } from '@hapi/joi';
import { CaseConfiguration } from '../models/entities/CaseConfiguration';

export const createPostVideo = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const { profile, post_title, post_content, post_video_type, post_video_access_code } = req.body;
    const { case_element_id } = req.body;
    const post_type = PostTypeRule.Video;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_video_id = uuidv4();

    const schemaValidation = [
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

    let schemaValidationResult: object = [];
    schemaValidation.forEach(e => {
        if (e.error) schemaValidationResult.push(e.error);
    });

    const isValid = schemaValidationResult.error ? false : true;

    if (!isValid) {
        util.controllerResult(res, 400, schemaValidationResult, "유효성 검증 불통과");
    }
    else {
        const profileData = await Profile.findOne({ where: { activity_name: profile } })
            .then(data => { return data });

        if (util.isEmptyObject(profileData)) {
            util.controllerResult(res, 400, null, profile + " 프로필을 찾을 수 없습니다.");
        }
        else {
            const caseElement = await CaseElement.findOne({ where: { case_element_id } });
            const isExistCaseElement = util.isEmptyObject(caseElement) ? false : true;

            if (isExistCaseElement === false) {
                util.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
            } else {
                const caseConfiguration = await CaseConfiguration.findOne({
                    where: { case_element_id }
                });
                const isExistCaseConfiguration = util.isEmptyObject(caseConfiguration) ? false : true;
                const isEquelCaseConfAndProfile = (caseConfiguration.profile_id === profileData.profile_id);

                if (isExistCaseConfiguration === false) {
                    util.controllerResult(res, 400, null, "해당 케이스 구성을 찾을 수 없습니다.");
                }
                else if (isEquelCaseConfAndProfile) {
                    const profile_id = profileData.profile_id;

                    const publication = Publication.create({
                        publication_id,
                        user_id
                    });

                    const post = Post.create({
                        publication_id,
                        profile_id,
                        case_element_id,
                        post_id,
                        user_id,
                        post_type,
                        post_title,
                        post_content
                    });

                    const postVideo = PostVideo.create({
                        post_id,
                        post_video_id,
                        post_video_type,
                        post_video_access_code,
                    });

                    Promise.race([publication, post, postVideo])
                        .finally(() => util.controllerResult(res, 200));
                }
            }
        }
    }
});

export const getPostVideos = catchAsync(async (req: Request, res: Response) => {
    const { profile, page = 0, limit = 10, order = 'ASC', keyword = 'createdAt' } = req.query;

    const data = await PostVideo.findAndCountAll(util.paginate(
        page,
        limit,
        {
            include: {
                model: Post,
                where: {
                    profile_id: profile
                }
            },
            order: [[keyword, order]],
        }
    )).then(data => { return data });

    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        util.controllerResult(res, 200, data);
    }
});

export const getPostVideo = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await Post.findByPk(id).then(data => { return data });
    util.controllerResult(res, 200, data);
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
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        util.controllerResult(res, 200, data);
    }
});

export const deletePostVideo = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const publication = await Post.findByPk(id)
        .then(data => { return data });

    if (publication === null) {
        util.controllerResult(res, 400, null, "대상을 찾을 수 없습니다.");
    }
    else {
        const publication_id = publication.publication_id;
        const data = await Publication.update(
            { is_delete: 1 },
            { where: { publication_id } }
        );

        if (data === null) {
            util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
        }
        else {
            util.controllerResult(res, 200, data);
        }
    }
});