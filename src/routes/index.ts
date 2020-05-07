import { Router, Request, Response, NextFunction } from 'express';
import user from "./user.routes";
const routes = Router();

routes.use("/", user);
routes.use("/", (req: Request, res: Response) => {
    res.json({ message: "hello" });
})


export default routes;