import { Request, Response } from '../types/types.index';
import * as Joi from '@hapi/joi';
import * as utils from '../utils/utils.index';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../models/entities/entities.index';
import { AsyncReturnType } from './../types/types.index';
import { logStorage } from './../database/logStorage';

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { user_login_id, user_password } = req.body;

    const schema = Joi.object({
        user_login_id: Joi.string().required().min(3).max(10),
        user_password: Joi.string().required().min(8).max(20),
    }).options({ abortEarly: false });

    const schemaValidationResult = schema.validate({
        user_login_id,
        user_password
    });

    const isValid = schemaValidationResult.error ? false : true;

    if (!isValid) {
        utils.controllerResult(res, 400, schemaValidationResult.error, "유효성 검증 불통과");
    } else {
        const user: AsyncReturnType<any> = await User.findOne({ where: { user_login_id } }).then(data => { return data });

        if (user === null) {
            utils.controllerResult(res, 400, null, user_login_id + " 사용자가 존재하지 않습니다.");
        } else {
            const buff = user.user_password;
            const check = await User.isValidPassword(user_password, buff.toString());
            if (!check) {
                utils.controllerResult(res, 400, null, "비밀번호가 일치하지 않습니다.");
            }
            else {
                const token = User.getSignedToken(user.user_id);
                utils.controllerResult(res, 200, token);
            }
        }
    }
});