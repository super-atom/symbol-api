import { Router } from 'express';

import * as profileController from '../controllers/profile.controller';
import { validateProfile } from '../controllers/profile.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/')
    .post(authenticate, validateProfile, profileController.createProfile)
    .get(profileController.getProfiles)

router.route('/:id')
    .get(profileController.getProfile)
    .patch(authenticate, validateProfile, profileController.updateProfile)
    .delete(authenticate, validateProfile, profileController.deleteProfile)

export default router;