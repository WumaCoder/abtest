const hq = require("alias-hq");

module.exports = {
  testTimeout: 60000,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  roots: ["<rootDir>/libs/", "<rootDir>/src/"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",

  // resolver: "@deepkit/framework/resolve",
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: hq.get("jest"),
};
