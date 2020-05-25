import { Request, Response } from "express";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as winstonDailyRotateFile from "winston-daily-rotate-file";

export const logger = (level: string) => expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new winstonDailyRotateFile({
            filename: `./logs/${process.env.APP_NAME}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            level: level
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(msg =>
            `[${msg.level}]${msg.message} ${msg.timestamp}`
        )
    )
})

export default logger;