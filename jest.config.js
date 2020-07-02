module.exports = {
    roots: ['<rootDir>/src/tests'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    testMatch: ['**/__tests__/**/*.+(ts|ts|js)', '**/?(*.)+(spec|test).+(ts|ts|js)'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
    setupFiles: ['./jest.setup-file.ts'],
    testURL: 'http://127.0.0.1',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transformIgnorePatterns: ['/node_modules/'],
    collectCoverage: false,
    coverageReporters: ['json'],
    coverageDirectory: '/jest',
};
