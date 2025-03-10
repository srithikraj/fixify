module.exports = {
    testEnvironment: 'jsdom', // Simulates a browser environment for React
    setupFiles: ["<rootDir>/jest.setup.js"],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Optional: Setup file for test utilities
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      '\\.(jpg|jpeg|png|gif|avif|svg)$': '<rootDir>/src/__mocks__/fileMock.js', // Mock image imports
    },
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Transform JS/TS/JSX files with Babel
    },
    transformIgnorePatterns: [
      'node_modules/(?!(swiper|ssr-window|dom7)/)',
    ],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
  };