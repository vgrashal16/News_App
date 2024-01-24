// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['lcov', 'text', 'html'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(jpg|jpeg|png|gif|webp|svg|ico|ttf|woff|woff2|eot)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
