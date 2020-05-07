import * as dotenv from 'dotenv';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";
import { logger } from "./middlewares/logger";
import * as Sentry from '@sentry/node';
import routes from './routes';
import errorMiddleware from "./middlewares/errorHandler";

dotenv.config();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(Sentry.Handlers.requestHandler());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(logger('info'));

        this.app.use("/", routes);
        this.app.use(Sentry.Handlers.errorHandler());
    }
}

export default new App().app;