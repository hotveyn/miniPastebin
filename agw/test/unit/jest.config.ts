import { readFileSync } from 'fs';
import { join } from 'path';

import { type Config } from 'jest';

const pathToSWCConfig = join(`${__dirname}` + '../../../.swcrc');
const config = JSON.parse(readFileSync(pathToSWCConfig, 'utf8'));

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/integration-tests/',
    '/integration-test/',
  ],
  rootDir: '../../src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      { ...config /* custom configuration in Jest */ },
    ],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../../coverage',
  testEnvironment: 'node',
} satisfies Config;
