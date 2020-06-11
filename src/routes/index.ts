import { Router, Request, Response, NextFunction } from 'express';
import user from "./user.routes";
import auth from "./auth.routes";
import HttpError from '../class/httpError';
const routes = Router();

routes
    .use("/", auth)
    .use("/", user)
    .use("*", (req: Request, res: Response, next: NextFunction) => {
        next(new HttpError('NotFound', 404, `${req.originalUrl} 를 찾을 수 없습니다.`));
    })

export default routes;