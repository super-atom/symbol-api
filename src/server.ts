import http from 'http';
import app from './app';
import {
    Request, Response, NextFunction
} from "express";

// import { PORT } from "./config/config";
const PORT = 3000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('hello');
});

app.listen(PORT, () => console.log(`Server running : Port ${PORT}`));