import 'reflect-metadata';
import * as winston from 'winston';

winston.remove(winston.transports.Console);
winston.remove(winston.transports.File);

console.log("JEST SETUP!");

export let setHeader = {
    'Accept': 'supertest',
    'User-Agent': '*/*',
    'Content-Type': 'application/json',
}