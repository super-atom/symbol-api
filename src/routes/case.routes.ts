import { Router, Request, Response, NextFunction } from 'express';

import * as caseElementsController from '../controllers/caseElements.controller';
import { validateCaseElement } from '../controllers/caseElements.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route('/:id')
    .patch(authenticate, validateCaseElement, caseElementsController.updateCaseElement)
    .delete(authenticate, validateCaseElement, caseElementsController.deleteCaseElement)
    .get(caseElementsController.getCaseElementById)

router.route('/').get((req: Request, res: Response, next: NextFunction) => {
    if (req.query.profileId) caseElementsController.getCaseElementsByProfileId(req, res, next)
})

router.route('/')
    .post(authenticate, validateCaseElement, caseElementsController.createCaseElement)
    .get(caseElementsController.getCaseElements)

export default router;