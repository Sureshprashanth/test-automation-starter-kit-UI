import { expect } from "@playwright/test";

export function getAssertions() {
  return {
    toBeVisible: expect.any(Function),
    toContainText: expect.any(Function),
  };
}
