/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type */
declare module 'vitest' {
    interface Assertion<T = any> extends TestingLibraryMatchers<T, void> { }
    interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> { }
}