import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as dateFormat from 'date-fns';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/utils.index';
import { Post, Profile, Publication, CaseElement, CaseConfiguration } from '../models/entities/entities.index';
import { PostTypeRule, PostImageFileNamingRule } from '../rules/rules.index';
import { PostImage } from '../models/entities/PostImage';

export const createPostImage = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const { profile, post_title, post_content, post_image_type, is_exist_thumbnails } = req.body;
    const { case_element_id } = req.body;
    const post_type = PostTypeRule.Image;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_image_id = uuidv4();

    const schemaValidation = [
        Post.schemaValidation({
            post_type,
            post_title,
            post_content
        }),
        PostImage.schemaValidation({
            post_image_type,
            is_exist_thumbnails
        })
    ];

    const schemaValidationResult: object = [];
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
                    // const file = req.file;
                    const { file } = req.body;
                    const filename = uuidv4();
                    const image = await util.downloadImageToBase64(file)
                        .then(data => { return data });
                    const imageUrl = await util.uploadFile(image, filename);

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

                    const postImage = PostImage.create({
                        post_id,
                        post_image_id,
                        post_image_type,
                        is_exist_thumbnails
                    });

                    Promise.race([publication, post, postImage])
                        .finally(() => util.controllerResult(res, 200, imageUrl));
                }
            }
        }
    }
});

export const getPostImages = catchAsync(async (req: Request, res: Response) => {

});

export const getPostImage = catchAsync(async (req: Request, res: Response) => {

});

export const updatePostImage = catchAsync(async (req: Request, res: Response) => {

});

export const deletePostImage = catchAsync(async (req: Request, res: Response) => {

});