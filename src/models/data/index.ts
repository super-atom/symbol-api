import { userTypeData } from './UserType.data';

export class InitModelData {
    constructor() {
        this.init();
    }

    private init(): void {
        userTypeData();
    }
}