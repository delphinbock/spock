module.exports = {
    setupFilesAfterEnv: ['./jest.setup.ts'],
    verbose: false, // Details test
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'], // .spec.ts, .spec.tsx, .test.ts ou .test.tsx
    preset: "ts-jest",
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.scss$": "jest-transform-stub", // Utilise jest-transform-stub pour les fichiers SCSS
    },
    maxWorkers: 2,
    testTimeout: 30000,
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: 'test-results/jest',
            outputName: 'junit.xml',
        }],
    ],
};