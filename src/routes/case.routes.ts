import { Router } from 'express';

import * as caseController from '../controllers/case.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/')
    .post(authenticate, caseController.createCaseElement)
    .get(caseController.getCaseElements)

router.route('/:id')
    .get(caseController.getCaseElement)
    .patch(authenticate, caseController.updateCaseElement)
    .delete(authenticate, caseController.deleteCaseElement)

export default router;