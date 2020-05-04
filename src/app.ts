import * as dotenv from 'dotenv';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as Sentry from '@sentry/node';
import routes from './routes';

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
        this.app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json(),
            ),
            colorize: true
        }));

        this.app.use("/", routes);
        this.app.use(Sentry.Handlers.errorHandler());
    }
}

export default new App().app;