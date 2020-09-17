import { Router, Request, Response, NextFunction } from 'express';
import * as postController from '../controllers/post.controller';
import * as postVideoController from '../controllers/postVideo.controller';
import * as postImageController from '../controllers/postImage.controller';
import { validatePostVideo } from '../controllers/postVideo.controller';
import { validatePostImage } from '../controllers/postImage.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/videos')
    .post(authenticate, validatePostVideo, postVideoController.createPostVideo)

router.route('/videos').get((req: Request, res: Response, next: NextFunction) => {
    if (req.query.postId) postVideoController.getPostVideoByPostId(req, res, next)
    if (req.query.profileId) postVideoController.getPostVideosByProfileId(req, res, next)
    if (req.query.activityNames) postVideoController.getPostVideosByActivityNames(req, res, next)
})

router.route('/videos/:id')
    .patch(authenticate, validatePostVideo, postVideoController.updatePostVideo)
    .delete(authenticate, validatePostVideo, postVideoController.deletePostVideo)
    .get(postVideoController.getPostVideoById)

router.route('/images')
    .post(authenticate, validatePostImage, postImageController.createPostImage)
    .get(postImageController.getPostImages)

router.route('/images/:id')
    .patch(authenticate, validatePostImage, postImageController.updatePostImage)
    .delete(authenticate, validatePostImage, postImageController.deletePostImage)
    .get(postImageController.getPostImage)

router.route('/:id').get(postController.getPostsById)

router.route('/').get(postController.getPostsByCaseElementId)

export default router;