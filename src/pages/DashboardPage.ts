import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { fixture } from "../hooks/pageFixture";

export class DashboardPage extends BasePage {
  private welcomeMessage: Locator;
  private logoutButton: Locator;
  private pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  private initLocators() {
    this.welcomeMessage = this.page.locator('text=/Welcome/i');
    this.logoutButton = this.page.locator('button:has-text("Logout")');
    this.pageHeading = this.page.locator("h1");
  }

  async isDashboardDisplayed(): Promise<boolean> {
    fixture.logger.info("Checking if dashboard is displayed");
    return await this.isVisible(this.pageHeading);
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }

  async logout() {
    fixture.logger.info("Clicking logout button");
    await this.click(this.logoutButton);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyDashboardTitle(expectedTitle: string) {
    fixture.logger.info(`Verifying dashboard title: ${expectedTitle}`);
    const title = await this.getPageTitle();
    expect(title).toContain(expectedTitle);
  }
}
