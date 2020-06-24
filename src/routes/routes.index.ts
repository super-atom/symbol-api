import { Router, Request, Response, NextFunction } from 'express';
import auth from "./auth.routes";
import user from "./user.routes";
import profile from "./profile.routes";
import caseElement from "./case.routes";
import post from "./post.routes";
import HttpError from '../class/httpError';
import * as util from '../utils/utils.index';
const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/profiles", profile);
routes.use("/case", caseElement);
routes.use("/post", post);
routes.use((req, res, data) => {
    if (data === null) {
        util.controllerResult(res, 400, null, "사용자를 찾을 수 없습니다.")
    }
    else {
        util.controllerResult(res, 200, data);
    }
});
routes.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new HttpError('NotFound', 404, `${req.originalUrl} 를 찾을 수 없습니다.`));
});

export default routes;