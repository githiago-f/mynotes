/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '^controllers/(.+)$': '<rootDir>/src/controllers/$1',
    '^domain/(.+)$': '<rootDir>/src/domain/$1',
    '^helpers/(.+)$': '<rootDir>/src/helpers/$1',
    '^types/(.+)$': '<rootDir>/src/types/$1',
    '^app$': '<rootDir>/src/app'
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/__tests__'
  ]
};
