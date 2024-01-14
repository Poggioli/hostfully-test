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
  coveragePathIgnorePatterns: [
    "node_modules",
    "index.ts",
    ".*types.ts",
    "<rootDir>/src/components/ui",
    "<rootDir>/src/lib/utils.ts",
    "<rootDir>/src/service/api.ts",
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/vite-env.d.ts",
  ]
};