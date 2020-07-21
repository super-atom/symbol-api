import { Router } from 'express';

import * as caseElementsController from '../controllers/caseConfigurations.controller';

const router = Router();

router.route('/:id')
    .get(caseElementsController.getCaseConfigurationByProfileId)

export default router;