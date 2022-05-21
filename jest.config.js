/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
