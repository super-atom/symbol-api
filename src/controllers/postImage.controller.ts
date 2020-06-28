import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as util from '../utils/utils.index';
import { Post, Profile, Publication, CaseElement, CaseConfiguration } from '../models/entities/entities.index';
import { PostTypeRule } from '../rules/rules.index';
import { PostImage } from '../models/entities/PostImage';
import { PublicationTypeRule } from '../rules/type.rule';

async function getPostImageAttributes(req: Request) {
    let { case_element_id, post_type, profile, post_title, post_content, post_image_type, is_exist_thumbnails, publication_type } = req.body;

    // TODO: USING AJV pacakge

    return {
        case_element_id, post_type, profile, post_title, post_content, post_image_type, is_exist_thumbnails, publication_type
    }
}

export async function validatePostImage(req: Request, res: Response, next: NextFunction): Promise<T> {
    const input = await getPostImageAttributes(req).then(data => { return data });
    const { case_element_id, post_type, profile, post_title, post_content, post_image_type, is_exist_thumbnails } = input;
    let { publication_type = PublicationTypeRule.PostImage } = input;

    const schemaValidations = [
        Profile.schemaValidation({
            activity_name: profile
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
    const isValid = util.isEmptyData(schemaValidationResults);

    if (isValid === false) {
        util.controllerResult(res, 400, schemaValidationResults, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const createPostImage = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input = await getPostImageAttributes(req).then(data => { return data });
    const { case_element_id, profile, post_title, post_content, post_image_type, is_exist_thumbnails } = input;
    const { publication_type = PublicationTypeRule.PostImage } = input;
    const post_type = PostTypeRule.Image;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_image_id = uuidv4();
    let isFinalCheck = false;

    // Final Check
    const profileData = await Profile.findOne({ where: { activity_name: profile } })
        .then(data => { return data });

    if (util.isEmptyData(profileData)) {
        util.controllerResult(res, 400, null, profile + " 프로필을 찾을 수 없습니다.");
    }
    else {
        const caseElement = await CaseElement.findOne({ where: { case_element_id } });
        if (util.isEmptyData(caseElement)) {
            util.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
        } else {
            const caseConfiguration = await CaseConfiguration.findOne({
                where: { case_element_id }
            });
            const isEquelCaseConfAndProfile = (caseConfiguration.profile_id === profileData.profile_id);

            if (util.isEmptyData(caseConfiguration)) {
                util.controllerResult(res, 400, null, "해당 케이스 구성을 찾을 수 없습니다.");
            } else if (isEquelCaseConfAndProfile) {
                isFinalCheck = true;
            }
        }
    }

    if (isFinalCheck) {
        // const file = req.file;
        const { file } = req.body;
        const filename = uuidv4();

        const image = await util.downloadImageToBase64(file)
            .then(data => { return data });
        const imageUrl = await util.uploadFile(image, filename);

        const publication = await Publication.create({
            publication_id,
            publication_type,
            user_id
        });

        const post = await Post.create({
            publication_id,
            profile,
            case_element_id,
            post_id,
            user_id,
            post_type,
            post_title,
            post_content
        });

        const postImage = await PostImage.create({
            post_id,
            post_image_id,
            post_image_type,
            is_exist_thumbnails
        });

        Promise.race([publication, post, postImage])
            .finally(() => util.controllerResult(res, 200, imageUrl));
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