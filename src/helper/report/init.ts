import * as fs from "fs";
import * as path from "path";

const testResultsDir = "test-results";
const screenshotsDir = path.join(testResultsDir, "screenshots");
const videosDir = path.join(testResultsDir, "videos");
const logsDir = ".logs";

[testResultsDir, screenshotsDir, videosDir, logsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log("✅ Test environment initialized");
