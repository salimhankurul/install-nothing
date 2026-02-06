module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        'lib/**/*.js',
        'installer.js',
        'cli.js',
        '!lib/**/*.test.js',
        '!test-helpers.js',
        '!**/node_modules/**'
    ],
    coverageThreshold: {
        global: {
            branches: 65,
            functions: 65,
            lines: 65,
            statements: 65
        }
    },
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/lib/**/*.test.js',
        '**/?(*.)+(spec|test).js',
        '!test-helpers.js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        'test-helpers.js'
    ],
    verbose: true,
    testTimeout: 10000,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};