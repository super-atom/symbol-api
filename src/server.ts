import app from './app';
import {
    Request, Response, NextFunction
} from "express";

// import { PORT } from "./config/config";

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('hello');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running : Port ${PORT}`));