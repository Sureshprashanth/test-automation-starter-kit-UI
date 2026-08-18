import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { fixture } from "./pageFixture";
import { BrowserManager } from "../helper/browsers/browserManager";
import { Logger } from "winston";
import { getLogger } from "../helper/util/logger";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

let browserManager: BrowserManager;
let logger: Logger;

BeforeAll(async function () {
  logger = getLogger();
  browserManager = new BrowserManager(logger);
  fixture.logger = logger;
  fixture.browserManager = browserManager;
  logger.info("✅ Test execution started");
});

Before(async function (scenario) {
  fixture.logger.info(`🧪 Starting scenario: ${scenario.pickle.name}`);
  const page = await browserManager.createPage();
  fixture.page = page;
  fixture.loginPage = new LoginPage(page);
  fixture.dashboardPage = new DashboardPage(page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    fixture.logger.error(`❌ Scenario failed: ${scenario.pickle.name}`);
    const screenshot = await fixture.page?.screenshot({
      path: `test-results/screenshots/${Date.now()}-failure.png`,
    });
    fixture.logger.info(`📸 Screenshot saved for failed test`);
  } else {
    fixture.logger.info(`✅ Scenario passed: ${scenario.pickle.name}`);
  }

  await browserManager.closePage();
});

AfterAll(async function () {
  await browserManager.closeAllBrowsers();
  fixture.logger.info("✅ Test execution completed");
});
