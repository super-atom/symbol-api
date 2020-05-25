import { Router } from 'express';

import * as userController from '../controllers/user.controller';

const router = Router();

router
    .post('/user', userController.postUser)
    .get('/user/:id', userController.getUser)
    .get('/users', userController.getUsers);

export default router;