import reporter from "multiple-cucumber-html-reporter";
import * as fs from "fs";

const reportPath = "test-results/cucumber-report.json";

if (fs.existsSync(reportPath)) {
  const options = {
    theme: "bootstrap",
    jsonFile: reportPath,
    output: "test-results/cucumber-report.html",
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
      "App Version": "1.0.0",
      "Test Environment": process.env.ENV || "local",
      Browser: process.env.BROWSER || "chromium",
      Platform: process.platform,
      Parallel: process.env.PARALLEL_WORKERS || "4",
      Executed: new Date().toISOString(),
    },
  };

  reporter.generate(options);
  console.log("✅ Report generated successfully!");
} else {
  console.log("⚠️ No test results found. Run tests first with 'npm test'");
}
