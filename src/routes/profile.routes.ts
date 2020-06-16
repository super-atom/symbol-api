import { Router } from 'express';

import * as profileController from '../controllers/profile.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/')
    .post(authenticate, profileController.createProfile)
    .get(profileController.getProfiles)

router.route('/:id')
    .get(profileController.getProfile)
    .patch(authenticate, profileController.updateProfile)
    .delete(authenticate, profileController.deleteProfile)

export default router;