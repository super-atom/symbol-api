export { };

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            [key: string]: any;
        }

        interface Global {
            __rootdir__: string;
        }
    }

    namespace Express {
        export interface Request {
            [key: string]: any;
        }
    }
}