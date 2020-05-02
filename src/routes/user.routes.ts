import {
    Request, Response, NextFunction
} from 'express';
import router from "./routes";

router.get('/user', (req: Request, res: Response, next: NextFunction) => {
    console.log('get /user');
});

export default userRoutes;