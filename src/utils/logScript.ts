import * as dateFns from 'date-fns';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as chalk from 'chalk';

export class LogScript {
    public static instance: LogScript;
    private logScripts: [[string, string, string]];
    private path = path.resolve(__dirname, '../static/');
    private backupPath = path.resolve(__dirname, '../static/');
    private filename = this.path + "/logScript_" + dateFns.format(new Date(), 'yyMMdd') + '.json';
    private backupFilename = this.backupPath + "/backup_logScript_" + dateFns.format(new Date(), 'yyMMdd') + '.json';

    constructor() {
        this.loadLogScripts();
    }

    static getInstance(): LogScript {
        if (!LogScript.instance) {
            LogScript.instance = new LogScript();
        }
        return LogScript.instance;
    }

    public addTupleLogScripts(script: string, nativeScript: string): void {
        let logScripts = this.getLogScripts();
        if (logScripts === undefined) {
            logScripts = new Array(this.logScriptGenerator(script, nativeScript));
        } else {
            logScripts.push(this.logScriptGenerator(script, nativeScript));
        }
    }

    public getLogScripts(): [[string, string, string]] {
        return this.logScripts;
    }

    private setLogScripts(data: [[string, string, string]]): void {
        this.logScripts = data;
    }

    public printLogScripts(): void {
        console.log(this.getLogScripts());
    }

    public saveLogScripts(): void {
        const scripts = this.getLogScripts();

        mkdirp.sync(this.path);

        try {
            fs.writeFileSync(this.getFileName(), JSON.stringify(scripts), { mode: 0o777 });
            console.log(chalk.green("logScripts Save success!"));
        } catch (err) {
            console.log(err);
        }
    }

    public findLogScript(array: object, item: string): [[string, string, string]] | null {
        let count = 0;
        let result = null;

        if (!array) {
            console.log(chalk.yellow("Find log script : Error in array"))
        } else {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < 3; j++) {
                    if (array[i][j] === item) {
                        count++;
                        result = array[i];
                        console.log("Find log script : ", [i, j], array[i][j]);
                    }
                }
            }
            if (count === 0) {
                console.log(chalk.yellow("Not exists keyword : " + item));
            } else {
                console.log("Find log script count : ", count);
            }
        }

        return result;
    }

    private loadLogScripts(): object | null | undefined {
        let file = this.getFileName();
        if (this.isExistsFile(this.getFileName()) === false) {
            console.log(chalk.yellow("Not exists log scripts file. Attempt to use backup data..."));
            if (this.isExistsFile(this.backupFilename)) {
                file = this.backupFilename;
            } else {
                console.log(chalk.yellow("Not exists backup log scripts file!"));
                // TODO : 원격 저장소의 백업파일 로드
            }
        } else {
            file = this.getFileName();
        }
        try {
            const loadScriptFile = fs.readFileSync(
                file, {
                encoding: 'utf8',
                flag: 'r'
            });

            if (loadScriptFile.length === 0) {
                console.log(chalk.yellow("Log script file is empty"));
            } else {
                this.setLogScripts(JSON.parse(loadScriptFile));
            }
        } catch (err) {
            console.log(err);
        }
    }

    private accessPermissionCheck(): void {
        fs.access(this.path, fs.constants.F_OK, (err) => {
            if (err) {
                if (err) {
                    console.log("%s doesn't exist", path);
                } else {
                    console.log('can execute %s', path);
                }
            }
        });

        fs.access(this.path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                console.log("%s doesn't exist", path);
            } else {
                console.log('can read/write %s', path);
            }
        });
    }

    private isExistsFile(file): boolean {
        return fs.existsSync(file);
    }

    private getFileName(): string {
        return this.filename;
    }

    private logScriptGenerator(script: string, nativeScript: string): [string, string, string] {
        const randomValue = crypto.randomBytes(40).readUInt32BE().toString(16);
        const code = dateFns.format(new Date(), 'yyMMddHHmmss') + randomValue;
        return [code, script, nativeScript];
    }
}