import { Router, Request, Response, NextFunction } from 'express';
import auth from "./auth.routes";
import user from "./user.routes";
import profile from "./profile.routes";
import caseElement from "./case.routes";
import HttpError from '../class/httpError';
const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/profiles", profile);
routes.use("/case", caseElement);
routes.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new HttpError('NotFound', 404, `${req.originalUrl} 를 찾을 수 없습니다.`));
});

export default routes;