import '@testing-library/jest-dom';  // Import jest-dom for improved assertions
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder globally for Jest tests
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock ResizeObserver in Jest tests
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};