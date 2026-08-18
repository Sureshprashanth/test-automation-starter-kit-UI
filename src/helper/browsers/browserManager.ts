import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "@playwright/test";
import { Logger } from "winston";

export class BrowserManager {
  private browser: Browser | undefined;
  private context: BrowserContext | undefined;
  private pages: Set<Page> = new Set();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async createPage(): Promise<Page> {
    try {
      if (!this.browser) {
        await this.launchBrowser();
      }

      if (!this.context) {
        this.context = await this.browser!.newContext();
      }

      const page = await this.context.newPage();
      this.pages.add(page);

      this.logger.info(`📄 New page created (Total pages: ${this.pages.size})`);
      return page;
    } catch (error) {
      this.logger.error(`Failed to create page: ${error}`);
      throw error;
    }
  }

  private async launchBrowser() {
    try {
      const browserType = process.env.BROWSER || "chromium";
      const options = {
        headless: process.env.HEADED !== "true",
        slowMo: parseInt(process.env.SLOW_MO || "0"),
      };

      switch (browserType.toLowerCase()) {
        case "firefox":
          this.browser = await firefox.launch(options);
          break;
        case "webkit":
          this.browser = await webkit.launch(options);
          break;
        case "chromium":
        default:
          this.browser = await chromium.launch(options);
      }

      this.logger.info(`🌐 ${browserType} browser launched`);
    } catch (error) {
      this.logger.error(`Failed to launch browser: ${error}`);
      throw error;
    }
  }

  async closePage() {
    if (this.pages.size > 0) {
      const page = Array.from(this.pages)[this.pages.size - 1];
      await page.close();
      this.pages.delete(page);
      this.logger.info(`📄 Page closed (Remaining pages: ${this.pages.size})`);
    }
  }

  async closeAllBrowsers() {
    try {
      for (const page of this.pages) {
        await page.close();
      }
      this.pages.clear();

      if (this.context) {
        await this.context.close();
        this.context = undefined;
      }

      if (this.browser) {
        await this.browser.close();
        this.browser = undefined;
      }

      this.logger.info("🌐 All browsers closed");
    } catch (error) {
      this.logger.error(`Error closing browsers: ${error}`);
    }
  }
}
