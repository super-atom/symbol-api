import { Router } from 'express';

import * as userController from '../controllers/user.controller';
import * as jwt from 'jsonwebtoken';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/users')
    .post(userController.createUser)
    .get(authenticate, userController.getUsers)


router.route('/users/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)

export default router;