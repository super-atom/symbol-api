import { Router } from 'express';
import { logger } from '../middlewares/logger';

import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/user/:id', userController.getUser);
router.post('/user', userController.postUser);
router.get('/users', userController.getUsers);

export default router;