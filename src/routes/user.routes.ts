import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/')
    .post(userController.createUser)
    .get(authenticate, userController.getUsers)


router.route('/:id')
    .get(userController.getUser)
    .patch(authenticate, userController.updateUser)
    .delete(authenticate, userController.deleteUser)

export default router;