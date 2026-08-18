import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { fixture } from "../hooks/pageFixture";

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  private initLocators() {
    this.usernameInput = this.page.locator('input[name="username"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.loginButton = this.page.locator('button[type="submit"]');
    this.errorMessage = this.page.locator('[class*="error"]');
  }

  async navigateToLoginPage() {
    const baseUrl = process.env.DEMO_SITE_URL || "https://practicetestautomation.com";
    await this.navigateTo(`${baseUrl}/login`);
    fixture.logger.info("Navigated to login page");
  }

  async enterUsername(username: string) {
    await this.fillText(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fillText(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
    await this.page.waitForLoadState("networkidle");
  }

  async login(username: string, password: string) {
    fixture.logger.info(`Logging in with username: ${username}`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginPageVisible(): Promise<boolean> {
    return await this.isVisible(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
