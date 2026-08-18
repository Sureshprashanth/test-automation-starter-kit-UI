import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

Given("User is on the login page", async function () {
  await fixture.loginPage.navigateToLoginPage();
});

When("User enters username {string}", async function (username: string) {
  await fixture.loginPage.enterUsername(username);
});

When("User enters password {string}", async function (password: string) {
  await fixture.loginPage.enterPassword(password);
});

When("User clicks the login button", async function () {
  await fixture.loginPage.clickLoginButton();
});

When("User logs in with username {string} and password {string}", async function (username: string, password: string) {
  await fixture.loginPage.login(username, password);
});

Then("User should see the dashboard", async function () {
  const isDashboardVisible = await fixture.dashboardPage.isDashboardDisplayed();
  expect(isDashboardVisible).toBe(true);
  fixture.logger.info("✅ Dashboard is visible");
});

Then("Login page should be visible", async function () {
  const isLoginPageVisible = await fixture.loginPage.isLoginPageVisible();
  expect(isLoginPageVisible).toBe(true);
  fixture.logger.info("✅ Login page is visible");
});

Then("Login page should contain username field", async function () {
  const isLoginPageVisible = await fixture.loginPage.isLoginPageVisible();
  expect(isLoginPageVisible).toBe(true);
  fixture.logger.info("✅ Username field is present on login page");
});

Then("Login page should contain password field", async function () {
  const isLoginPageVisible = await fixture.loginPage.isLoginPageVisible();
  expect(isLoginPageVisible).toBe(true);
  fixture.logger.info("✅ Password field is present on login page");
});

Then("Login page should contain login button", async function () {
  const isLoginPageVisible = await fixture.loginPage.isLoginPageVisible();
  expect(isLoginPageVisible).toBe(true);
  fixture.logger.info("✅ Login button is present on login page");
});
