module.exports = {
    roots: ['<rootDir>/tests'],
    setupFiles: ['<rootDir>/jest.setup.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            isolatedModules: true,
            diagnostics: {
                pathRegex: /\.(spec|test)\.ts$/,
            },
        },
    },
    testMatch: ['**/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
    testPathIgnorePatterns: ['/lib/', '/node_modules/', '/auth/', '/externals/', '/logs/', '/tests/mockup.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testURL: 'http://127.0.0.1',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    collectCoverage: false,
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: '/jest',
};
