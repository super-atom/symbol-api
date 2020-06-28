import { Router } from 'express';
import * as authenticationController from '../controllers/authentication.controller';

const router = Router();

router
    .post('/login', authenticationController.loginUser)

export default router;