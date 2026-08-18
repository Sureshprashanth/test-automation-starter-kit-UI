import { Page, Locator, expect } from "@playwright/test";
import { fixture } from "../hooks/pageFixture";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    fixture.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async fillText(locator: Locator, text: string) {
    fixture.logger.info(`Filling text: ${text}`);
    await locator.fill(text);
  }

  async click(locator: Locator, options?: { force?: boolean }) {
    fixture.logger.info(`Clicking element`);
    await locator.click(options);
  }

  async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent();
    fixture.logger.info(`Got text: ${text}`);
    return text || "";
  }

  async waitForElement(locator: Locator, timeout = 10000) {
    fixture.logger.info(`Waiting for element (timeout: ${timeout}ms)`);
    await locator.waitFor({ timeout });
  }

  async isVisible(locator: Locator): Promise<boolean> {
    const visible = await locator.isVisible();
    fixture.logger.info(`Element visibility: ${visible}`);
    return visible;
  }

  async expect(locator: Locator).toBeVisible() {
    await expect(locator).toBeVisible();
  }

  async expect(locator: Locator).toContainText(text: string) {
    await expect(locator).toContainText(text);
  }

  async waitForLoadState() {
    fixture.logger.info(`Waiting for page load state`);
    await this.page.waitForLoadState("networkidle");
  }

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    fixture.logger.info(`Page title: ${title}`);
    return title;
  }

  async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    fixture.logger.info(`Current URL: ${url}`);
    return url;
  }
}
