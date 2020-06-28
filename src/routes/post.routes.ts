import { Router } from 'express';

import * as postVideoController from '../controllers/postVideo.controller';
import * as postImageController from '../controllers/postImage.controller';
import { validatePostVideo } from '../controllers/postVideo.controller';
import { validatePostImage } from '../controllers/postImage.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/videos')
    .post(authenticate, validatePostVideo, postVideoController.createPostVideo)
    .get(postVideoController.getPostVideos)

router.route('/videos/:id')
    .get(postVideoController.getPostVideo)
    .patch(authenticate, validatePostVideo, postVideoController.updatePostVideo)
    .delete(authenticate, validatePostVideo, postVideoController.deletePostVideo)

router.route('/images')
    .post(authenticate, validatePostImage, postImageController.createPostImage)
    .get(postImageController.getPostImages)

router.route('/images/:id')
    .get(postImageController.getPostImage)
    .patch(authenticate, validatePostImage, postImageController.updatePostImage)
    .delete(authenticate, validatePostImage, postImageController.deletePostImage)

export default router;