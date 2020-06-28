import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import { validateUser } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth';
import UserTypeRule from '../rules/type.rule';

const router = Router();

router.route('/')
    .post(validateUser, userController.createUser)
    .get(userController.getUsers)

router.route('/:id')
    .get(userController.getUser)
    .patch(authenticate, validateUser, userController.updateUser)
    .delete(authenticate, validateUser, userController.deleteUser)

export default router;