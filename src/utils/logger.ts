import { Request, Response } from "express";
import * as winston from 'winston';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    )
});

export default logger;