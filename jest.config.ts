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
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@base/(.*)$': '<rootDir>/src/components/0_base/$1',
        '^@atoms/(.*)$': '<rootDir>/src/components/1_atoms/$1',
        '^@molecules/(.*)$': '<rootDir>/src/components/2_molecules/$1',
        '^@organisms/(.*)$': '<rootDir>/src/components/3_organisms/$1',
        '^@templates/(.*)$': '<rootDir>/src/components/4_templates/$1',
        '^@pages/(.*)$': '<rootDir>/src/components/5_pages/$1',
        '^@objs/(.*)$': '<rootDir>/src/objs/$1',
        '^@redux/(.*)$': '<rootDir>/src/redux/$1',
        '^@libs/(.*)$': '<rootDir>/src/libs/$1',
        '^@typage/(.*)$': '<rootDir>/src/types/$1',
    },
};