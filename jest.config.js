module.exports = {
    roots: ['<rootDir>/src/tests'],
    setupFiles: ['./jest.setup.js'],
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
    testPathIgnorePatterns: ['/lib/', '/node_modules/'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testURL: 'http://127.0.0.1',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    collectCoverage: false,
    // coveragePathIgnorePatterns: ['/node_modules/', './src/types/modules.d.ts.d.ts'],
    // coverageReporters: ['json'],
    // coverageDirectory: '/jest',
};
