import { Router } from 'express';

import * as postVideoController from '../controllers/postVideo.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/video')
    .post(authenticate, postVideoController.createPostVideo)
    .get(postVideoController.getPostVideos)

router.route('/video/:id')
    .get(postVideoController.getPostVideo)
    .patch(authenticate, postVideoController.updatePostVideo)
    .delete(authenticate, postVideoController.deletePostVideo)

export default router;