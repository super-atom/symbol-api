class TestData {
    public endpoint;
    public data;
    constructor(endpoint: string, data: object | null) {
        this.endpoint = endpoint;
        this.data = data;
    }
    public getEndPoint(): string {
        return this.endpoint;
    }
    public getData(): object {
        return this.data;
    }
}

const router = {
    users: '/users',
    profiles: '/profiles'
}

export const userTest = {
    createUser: new TestData(router.users, {
        "user_login_id": "test",
        "user_email": "test@test.com",
        "user_password": "12345678",
        "gender": 1,
        "birthday": "2020-01-01",
        "real_name": "test",
        "activity_name": "test",
    }),
    getUsers: new TestData(router.users + '?page=0&limit=3&order=ASC&sortBy=createdAt', null)
}

export const profileTest = {
    getProfiles: new TestData(router.profiles + '?page=0&limit=3&order=ASC&sortBy=createdAt', null)
}