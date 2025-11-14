export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const roots = ['<rootDir>/src'];
export const testMatch = ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'];
export const transform = {
  '^.+\\.ts$': 'ts-jest',
};

export const collectCoverageFrom = [
  'src/**/*.ts',
  '!src/**/*.d.ts',
  '!src/**/*.interface.ts',
  '!src/index.ts',
  '!src/server.ts',
];

export const coverageThreshold = {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
};