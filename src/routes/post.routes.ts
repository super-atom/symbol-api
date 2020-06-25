import { Router } from 'express';

import * as postVideoController from '../controllers/postVideo.controller';
import * as postImageController from '../controllers/postImage.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/videos')
    .post(authenticate, postVideoController.createPostVideo)
    .get(postVideoController.getPostVideos)

router.route('/videos/:id')
    .get(postVideoController.getPostVideo)
    .patch(authenticate, postVideoController.updatePostVideo)
    .delete(authenticate, postVideoController.deletePostVideo)

router.route('/images')
    .post(authenticate, postImageController.createPostImage)
    .get(postImageController.getPostImages)

router.route('/images/:id')
    .get(postImageController.getPostImage)
    .patch(authenticate, postImageController.updatePostImage)
    .delete(authenticate, postImageController.deletePostImage)

export default router;