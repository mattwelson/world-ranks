// setup.ts or setup.js (create this in your test directory)
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Add the custom matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});
