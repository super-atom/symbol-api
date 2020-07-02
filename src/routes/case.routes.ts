import { Router } from 'express';

import * as caseController from '../controllers/case.controller';
import { validateCaseElement } from '../controllers/case.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/')
    .post(authenticate, validateCaseElement, caseController.createCaseElement)
    .get(caseController.getCaseElements)

router.route('/:id')
    .get(caseController.getCaseElement)
    .patch(authenticate, validateCaseElement, caseController.updateCaseElement)
    .delete(authenticate, validateCaseElement, caseController.deleteCaseElement)

export default router;