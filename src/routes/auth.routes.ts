import { Router } from 'express';
import * as authenticationController from '../controllers/authentication.controller';
import * as csrf from 'csurf';

const router = Router();

router
    .post('/login', authenticationController.loginUser)

export default router;