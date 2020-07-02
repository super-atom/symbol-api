import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Post, Profile, Publication, CaseElement, CaseConfiguration } from '../models/entities/entities.index';
import { PostTypeRule } from '../rules/rules.index';
import { PostImage } from '../models/entities/PostImage';
import { PublicationTypeRule } from '../rules/type.rule';

async function getPostImageAttributes(req: Request): Promise<object> {
    const { case_element_id, activity_name, post_title, post_content, post_image_type, is_exist_thumbnails, post_type = PostTypeRule.Image, publication_type = PublicationTypeRule.PostImage } = req.body;

    // TODO: USING AJV pacakge

    return {
        case_element_id, post_type, activity_name, post_title, post_content, post_image_type, is_exist_thumbnails, publication_type
    }
}

export async function validatePostImage(req: Request, res: Response, next: NextFunction): Promise<NextFunction> {
    const input = await getPostImageAttributes(req).then(data => { return data });
    const { case_element_id, post_type, activity_name, post_title, post_content, post_image_type, is_exist_thumbnails, publication_type } = input;

    const schemaValidations = [
        Profile.schemaValidation({
            activity_name
        }),
        CaseElement.schemaValidation({
            case_element_id,
        }),
        CaseElement.schemaValidation({
            case_element_id,
        }),
        Post.schemaValidation({
            post_type,
            post_title,
            post_content
        }),
        PostImage.schemaValidation({
            post_image_type,
            is_exist_thumbnails
        }),
        Publication.schemaValidation({
            publication_type
        })
    ];

    let schemaValidationResults: object = [];
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

export const createPostImage = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input = await getPostImageAttributes(req).then(data => { return data });
    const { case_element_id, activity_name, post_title, post_content, post_image_type, publication_type, post_type } = input;
    let { is_exist_thumbnails = false } = input;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_image_id = uuidv4();
    let isFinalCheck = false;
    let imageUrl = null;

    // Final Check
    const profileData = await Profile.findOne({ where: { activity_name } })
        .then(data => { return data });

    if (utils.isEmptyData(profileData)) {
        utils.controllerResult(res, 400, null, "프로필을 찾을 수 없습니다.");
    }
    else {
        const caseElement = await CaseElement.findOne({ where: { case_element_id } });
        if (utils.isEmptyData(caseElement)) {
            utils.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
        } else {
            const caseConfiguration = await CaseConfiguration.findOne({
                where: { case_element_id }
            });
            const isEquelCaseConfAndProfile = (caseConfiguration.profile_id === profileData.profile_id);

            if (utils.isEmptyData(caseConfiguration)) {
                utils.controllerResult(res, 400, null, "해당 케이스 구성을 찾을 수 없습니다.");
            } else if (isEquelCaseConfAndProfile) {
                // const file = req.file;
                const { file } = req.body;
                const image = await utils.downloadImageToBase64(file)
                    .then(data => { return data });
                const filename = uuidv4();

                // TODO : 썸네일 생성유무 조건 판별 & 생성 로직

                imageUrl = await utils.uploadFile(image, filename)
                    .then(data => { return data })
                    .finally(() => {
                        isFinalCheck = true;
                    });
            }
        }
    }

    if (isFinalCheck) {
        const publication = await Publication.create({
            publication_id,
            publication_type,
            user_id
        });

        const post = await Post.create({
            publication_id,
            case_element_id,
            post_id,
            user_id,
            post_type,
            post_title,
            post_content,
            activity_name,
        });

        const postImage = await PostImage.create({
            post_id,
            post_image_id,
            post_image_type,
            is_exist_thumbnails
        });

        const result = await Promise
            .all([publication, post, postImage])
            .then(data => { return data });

        if (!result) {
            utils.controllerResult(res, 400);
        } else {
            utils.controllerResult(res, 200, imageUrl);
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