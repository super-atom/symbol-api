import * as dateFns from 'date-fns';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as chalk from 'chalk';

export class LogScript {
    public static instance: LogScript;
    private logScripts: [[string, string, string]];
    private path = path.resolve(path.join('src/static/logScripts/'));
    private backupPath = path.resolve(path.join(this.path, '/backup/'));
    private filename_prefix = "logScript";
    private backupFilename_prefix = "backup";
    private filename_postfix = "_" + dateFns.format(new Date(), 'yyMMdd') + '.json';
    private filename = path.resolve(path.join(this.path, "/", this.filename_prefix + this.filename_postfix));
    private backupFilename = path.resolve(path.join(this.backupPath, "/", this.backupFilename_prefix + "_" + this.filename_prefix + this.filename_postfix));

    constructor() {
        this.loadLogScripts();
    }

    static getInstance(): LogScript {
        if (!LogScript.instance) {
            LogScript.instance = new LogScript();
        }
        return LogScript.instance;
    }

    public addLogScriptTuple(script: string, nativeScript: string): void {
        let logScripts = this.getLogScripts();
        if (logScripts === undefined) {
            logScripts = new Array(this.logScriptTupleGenerator(script, nativeScript));
        } else {
            logScripts.push(this.logScriptTupleGenerator(script, nativeScript));
        }
    }

    public getLogScripts(): [[string, string, string]] {
        return this.logScripts;
    }

    public printLogScripts(): void {
        console.log(this.getLogScripts());
    }

    public saveLogScripts(): void {
        const scripts = this.getLogScripts();

        // 경로에 해당하는 디렉토리가 없으면 폴더를 생성
        mkdirp.sync(this.backupPath);

        try {
            fs.writeFileSync(this.filename, JSON.stringify(scripts), { mode: 0o777 });
            fs.writeFileSync(this.backupFilename, JSON.stringify(scripts), { mode: 0o777 });
            console.log(chalk.green("logScripts Save success!"));
        } catch (err) {
            console.log(err);
        }
    }

    public findLogScripts(array: object, item: string): [[string, string, string]] | null {
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

    /**
     * 경로에서 파일을 찾아 logScripts 프로퍼티에 대입한다.
     */
    private loadLogScripts(): any {
        let file = this.filename;
        // 경로에 해당하는 디렉토리가 없으면 폴더를 생성
        mkdirp.sync(this.backupPath);

        // 1) 현재 파일 체크
        if (fs.existsSync(this.filename) === false) {
            console.log(chalk.yellow("Not exists log script file. Attempt to use backup file..."));

            // 2) 백업 파일 체크
            if (fs.existsSync(this.backupFilename)) {
                file = this.backupFilename;
            } else {
                let backupFilename = null;
                const searchKeyword = this.backupFilename_prefix + "_" + this.filename_prefix;
                const fileNames = fs.readdirSync(this.backupPath);
                fileNames.forEach((item) => {
                    // FIXME: indexOf 메소드는 break 가 안됨.
                    const target = item.lastIndexOf(searchKeyword);
                    if (target !== (-1)) {
                        backupFilename = path.resolve(path.join(this.backupPath, item))
                    }
                });

                // 3) 원격 저장소에서 파일을 가져와서 사용
                if (backupFilename !== null) {
                    file = backupFilename;
                } else {
                    console.log(chalk.yellow("Not exists backup log script file!"));
                    // TODO : 원격 저장소의 백업파일 로드
                }
            }
        }

        try {
            const loadScriptFile = fs.readFileSync(
                file, {
                encoding: 'utf8',
                flag: 'r'
            });

            if (!loadScriptFile) {
                console.log(chalk.yellow("Script setting error!"));
            }
            else if (loadScriptFile.length === 0) {
                console.log(chalk.yellow("Log script file is empty"));
            }
            else {
                console.log(chalk.green("Found log script file : " + file));
                this.logScripts = JSON.parse(loadScriptFile);
                if (this.logScripts) console.log(chalk.green("Log script load success!"));
            }
        } catch (err) {
            console.log("Load script file error : ", err);
        }
    }

    // TODO : 아래 메소드 로직도 확인해하고나서 파일 접근권한 체크에 사용해야함. 
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

    private logScriptTupleGenerator(script: string, nativeScript: string): [string, string, string] {
        const randomValue = crypto.randomBytes(40).readUInt32BE().toString(16);
        const code = dateFns.format(new Date(), 'yyMMddHHmmss') + randomValue;
        return [code, script, nativeScript];
    }
}