import SK_TESTS from './sk-tests.js'; // eslint-disable-line import/extensions
import CZ_TESTS from './cz-tests.js'; // eslint-disable-line import/extensions
import SK_CASES from './sk-cases.js'; // eslint-disable-line import/extensions
import CZ_CASES from './cz-cases.js'; // eslint-disable-line import/extensions

/* eslint-disable comma-spacing */
export const TESTS = [
  SK_CASES, SK_TESTS, CZ_CASES, CZ_TESTS,
];
export const DEFAULT_TESTS = ['sk', 'sk-tests', 'cz', 'cz-tests'];
