import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as pino from "express-pino-logger";
import * as helmet from "helmet";
import './database/db-connect';

// import userRoutes from "./routes/user.routes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(pino);

        // this.app.use("/user", userRoutes);
    }
}

export default new App().app;