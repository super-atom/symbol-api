import * as express from "express";
import * as path from 'path';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";
import * as session from 'express-session';
import * as Sentry from '@sentry/node';
import * as hpp from 'hpp';
import * as csrf from 'csurf';
import * as multer from 'multer';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import routes from './routes/routes.index';
import { Request, Response, NextFunction } from './types/types.index';
import { handleError, ErrorHandler } from './middlewares/errorHandler';
import { logger } from "./middlewares/logger";
import { limiter } from './middlewares/rateLimiter';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // this.app.use(Sentry.Handlers.requestHandler());
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.disable('x-powered-by');
        this.app.use(multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 5 * 1024 * 1024,
            }
        }).single('file'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(logger('info'));
        this.app.use(limiter);
        this.app.use(hpp());
        // this.app.use(session({
        //     secret: 'keyboard cat',
        //     resave: true,
        //     saveUninitialized: true,
        //     cookie: {
        //         httpOnly: true,
        //         secure: true,
        //         domain: process.env.DOMAIN,
        //         path: '/foo/bar',
        //         expires: new Date(Date.now() + 60 * 60 * 1000)
        //     }
        // }));
        this.app.use(compression());
        this.app.use("/", routes);
        this.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
            handleError(err, res);
        });
        // this.app.use(Sentry.Handlers.errorHandler());
    }
}

export default new App().app;