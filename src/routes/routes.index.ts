import { Router, Request, Response, NextFunction } from 'express';
import { connection } from './../database/dbConnect';
import HttpError from '../class/httpError';
import * as utils from "../utils/utils.index";
import auth from "./auth.routes";
import user from "./user.routes";
import profile from "./profile.routes";
import caseElement from "./case.routes";
import post from "./post.routes";

const routes = Router();

routes.get("/", (req: Request, res: Response) => { utils.controllerResult(res, 200) });
routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/profiles", profile);
routes.use("/cases", caseElement);
routes.use("/posts", post);
routes.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new HttpError('NotFound', 404, `${req.originalUrl} 를 찾을 수 없습니다.`));
});

export default routes;