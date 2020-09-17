import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Request, Response, NextFunction, AsyncReturnType } from './../types/types.index';
import { PostTypeRule, PublicationTypeRule } from '../rules/rules.index';
import { Post, Profile, Publication, PostImage, CaseElement, CaseConfiguration } from '../models/entities/entities.index';

async function getPostImageAttributes(req: Request): Promise<object> {
    const {
        case_element_id,
        activity_name,
        post_title,
        post_content,
        post_image_type,
        is_exist_thumbnails = false,
        post_type = PostTypeRule.Image,
        publication_type = PublicationTypeRule.PostImage
    } = req.body;

    // TODO: USING AJV pacakge

    return {
        case_element_id, post_type, activity_name, post_title, post_content, post_image_type, is_exist_thumbnails, publication_type
    }
}

export async function validatePostImage(req: Request, res: Response, next: NextFunction): Promise<NextFunction | void> {
    const input: AsyncReturnType<any> = await getPostImageAttributes(req).then(data => { return data });
    const { case_element_id, post_type, activity_name, post_title, post_content, post_image_type, is_exist_thumbnails, publication_type } = input;

    const validResult = utils.modelSchemaValidator([
        Profile.schemaValidation({
            activity_name
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
    ]);

    if (!utils.isEmptyData(validResult)) {
        utils.controllerResult(res, 400, validResult, "유효성 검증 불통과");
    } else {
        return next();
    }
};

export const createPostImage = catchAsync(async (req: Request, res: Response) => {
    const { user_id } = req.user;
    const input: AsyncReturnType<any> = await getPostImageAttributes(req).then(data => { return data });
    const { case_element_id, activity_name, post_title, post_content, post_image_type, publication_type, post_type, is_exist_thumbnails } = input;

    const publication_id = uuidv4();
    const post_id = uuidv4();
    const post_image_id = uuidv4();
    let isUploadPossibleCheck = false;
    let isFinalCheck = false;
    const imageUrl = null;

    // Final Check
    const profileData: AsyncReturnType<any> = await Profile.findOne({ where: { activity_name } })
        .then(data => { return data });

    if (utils.isEmptyData(profileData)) {
        utils.controllerResult(res, 400, null, "프로필을 찾을 수 없습니다.");
    }
    else {
        const caseElement: AsyncReturnType<any> = await CaseElement.findOne({ where: { case_element_id } });
        if (utils.isEmptyData(caseElement)) {
            utils.controllerResult(res, 400, null, "해당 케이스를 찾을 수 없습니다.")
        } else {
            const caseConfiguration: AsyncReturnType<any> = await CaseConfiguration.findOne({
                where: { case_element_id }
            });
            const isEquelCaseConfAndProfile = (caseConfiguration.profile_id === profileData.profile_id);

            if (utils.isEmptyData(caseConfiguration)) {
                utils.controllerResult(res, 400, null, "해당 케이스 구성을 찾을 수 없습니다.");
            } else if (isEquelCaseConfAndProfile) {
                isUploadPossibleCheck = true;
            }
        }
    }

    if (isUploadPossibleCheck) {
        // const file = req.file;
        const { file } = req.body;
        const image = await utils.downloadImageToBase64(file)
            .then(data => { return data });
        const filename = uuidv4();

        // TODO : 썸네일 생성유무 조건 판별 & 생성 로직

        // imageUrl = await utils.uploadFile(image, filename)
        //     .then(data => { return data });

        if (imageUrl) isFinalCheck = true;
    }

    if (isFinalCheck) {
        const publication: AsyncReturnType<any> = await Publication.create({
            publication_id,
            publication_type,
            user_id
        });

        const post: AsyncReturnType<any> = await Post.create({
            publication_id,
            case_element_id,
            post_id,
            user_id,
            post_type,
            post_title,
            post_content,
            activity_name,
        });

        const postImage: AsyncReturnType<any> = await PostImage.create({
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
    return false;
});

export const getPostImage = catchAsync(async (req: Request, res: Response) => {
    return false;
});

export const updatePostImage = catchAsync(async (req: Request, res: Response) => {
    return false;
});

export const deletePostImage = catchAsync(async (req: Request, res: Response) => {
    return false;
});