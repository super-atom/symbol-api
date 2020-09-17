import { Request, Response, NextFunction } from '../types/types.index';

export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    }
}