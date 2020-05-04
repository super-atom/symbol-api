import { Router } from 'express';
import { logger, logHandler } from '../utils/logger';

import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.postUser);

export default router;