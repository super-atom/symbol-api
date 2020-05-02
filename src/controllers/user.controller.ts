import express, {
    Request, Response, NextFunction
} from 'express';
import { getRepository } from "typeorm";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
};