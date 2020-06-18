import { User } from '../models/entities/User';
import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as authenticationController from '../controllers/authentication.controller';
import * as dotenv from 'dotenv';
import { util } from 'prettier';
import { controllerResult } from '../utils/controllerResult';
import * as bcrypt from 'bcrypt';

const router = Router();

router
    .post('/login', authenticationController.loginUser)

export default router;