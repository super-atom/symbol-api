module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/tests'],
    testURL: 'http://127.0.0.1',
    testEnvironment: 'node',
    // testEnvironment: '<rootDir>/tests/testEnvironment.ts',
    testEnvironmentOptions: { fake: 'fake' },
    globalSetup: '<rootDir>/jest.global.ts',
    setupFiles: ['<rootDir>/jest.setup.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.ts'],
    globalTeardown: '<rootDir>/jest.teardown.ts',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            isolatedModules: true,
            diagnostics: {
                pathRegex: /\.(spec|test)\.ts$/,
            },
        },
    },
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testMatch: ['**/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
    testPathIgnorePatterns: ['/lib/', '/node_modules/', '/auth/', '/externals/', '/logs/', '/tests/data/'],
    collectCoverage: false,
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: '/jest',
};
