import { catchAsync } from '../utils/catchAsync';
import * as utils from '../utils/utils.index';
import { Request, Response, AsyncReturnType } from '../types/types.index';
import { CaseConfiguration } from '../models/entities/entities.index';
import { getQueryUnitRule } from '../rules/rules.index';

export const getCaseConfigurationByProfileId = catchAsync(async (req: Request, res: Response) => {
    const { page = 0, limit = getQueryUnitRule.Small, order = 'ASC', sortBy = 'createdAt' } = req.query;
    const { id } = req.params;

    const data: AsyncReturnType<any> = await CaseConfiguration.findAndCountAll(
        utils.paginate(
            page,
            limit,
            {
                where: { 'profile_id': id },
                order: [[sortBy, order]]
            },
        )
    ).then(data => { return data });

    utils.getControllerResult(res, data);
});