module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css | less | scss)$": "identity- obj - proxy",
    "@/(.*)": "<rootDir>/src/$1"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.(ts|tsx)"
  ],
  setupFilesAfterEnv: ['./setup-jest.ts'],
  coveragePathIgnorePatterns: [
    "node_modules",
    "index.ts",
    ".*types.ts",
    "<rootDir>/src/components/ui",
    "<rootDir>/src/pages/Router.tsx",
    "<rootDir>/src/lib/utils.ts",
    "<rootDir>/src/lib/store.ts",
    "<rootDir>/src/service/api.ts",
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/App.tsx",
    "<rootDir>/src/vite-env.d.ts",
  ]
};