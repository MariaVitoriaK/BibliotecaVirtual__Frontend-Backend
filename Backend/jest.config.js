export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src/tests'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testTimeout: 20000, // evitar timeout
  detectOpenHandles: true, // ajuda a identificar conexões abertas
};
