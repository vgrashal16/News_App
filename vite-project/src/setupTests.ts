// src/setupTests.ts
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.enableMocks();
global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };