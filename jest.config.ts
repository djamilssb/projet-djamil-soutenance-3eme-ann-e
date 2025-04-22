import type { Config } from "jest";

const config: Config = {
  // Indiquez que Jest doit utiliser ts-jest pour transformer les fichiers TypeScript
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Extensions de fichiers que Jest doit reconnaître
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Dossier racine pour Jest
  roots: ["<rootDir>/src"],

  // Correspondance des fichiers de test
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js)"],

  // Ignorer la transformation des fichiers dans node_modules
  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  // Environnement de test
  testEnvironment: "node",

  // Résolution des modules
  moduleDirectories: ["node_modules", "<rootDir>/src"],

  // Mapper les modules non-JS si nécessaire
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;