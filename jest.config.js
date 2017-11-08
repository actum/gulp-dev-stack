module.exports = {
    testEnvironment: 'node',
    coverageReporters: ['html', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    coverageDirectory: '<rootDir>/test/coverage',
    setupFiles: ['./test/jestsetup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    collectCoverageFrom: ['src/scrips/components/_common/**/*.js']
};
