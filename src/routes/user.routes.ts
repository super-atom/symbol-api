import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth';
import UserTypeRule from '../rules/type.rule';

const router = Router();

router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers)

router.route('/:id')
    .get(userController.getUser)
    .patch(authenticate, userController.updateUser)
    .delete(authenticate, authorize(UserTypeRule.Operator), userController.deleteUser)

export default router;