// TODO : import 문제 해결해야함
import * as NodeEnvironment from 'jest-environment-node';

export class CustomEnvironment extends NodeEnvironment {
    constructor(config: any, context: any) {
        super(config, context);
        this.testPath = context.testPath;
        this.docblockPragmas = context.docblockPragmas;
    }

    async setup(): Promise<any> {
        console.log('CustomEnvironment');
        await super.setup();
        // await someSetupTasks(this.testPath);
        // this.global.someGlobalObject = createGlobalObject();

        // Will trigger if docblock contains @my-custom-pragma my-pragma-value
        // if (this.docblockPragmas['my-custom-pragma'] === 'my-pragma-value') {
        //     // ...
        // }
    }

    async teardown(): Promise<any> {
        // this.global.someGlobalObject = destroyGlobalObject();
        // await someTeardownTasks();
        await super.teardown();
    }

    runScript(script): Promise<any> {
        return super.runScript(script);
    }

    async handleTestEvent(event: any, state: any): Promise<any> {
        // if (event.name === 'test_start') {
        //     // ...
        // }
    }
}
