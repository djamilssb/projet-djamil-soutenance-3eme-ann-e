/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mappe l'alias @/ vers le dossier src/
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'], // Résout les modules dans node_modules et src/
};