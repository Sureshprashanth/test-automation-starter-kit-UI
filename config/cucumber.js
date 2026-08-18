const tag = process.env.TAGS || '';
const featurePaths = (process.env.FEATURE_PATHS || '')
  .split(',')
  .map((path) => path.trim())
  .filter(Boolean);

console.log("Running tests with tags: " + (tag === "" ? "All tests" : tag));
console.log(
  "Running tests with features: " +
    (featurePaths.length > 0 ? featurePaths.join(", ") : "All feature files")
);

module.exports = {
  default: {
    tags: tag,
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: featurePaths.length > 0 ? featurePaths : ["src/test/features/"],
    dryRun: false,
    require: [
      "src/test/steps/*.ts",
      "src/test/steps/**/*.ts",
      "src/hooks/hooks.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt"
    ],
    parallel: parseInt(process.env.PARALLEL_WORKERS) || 4
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: [
      "@rerun.txt"
    ],
    tags: "",
    dryRun: false,
    require: [
      "src/test/steps/*.ts",
      "src/test/steps/**/*.ts",
      "src/hooks/hooks.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress",
      "html:test-results/cucumber-report-rerun.html",
      "json:test-results/cucumber-report-rerun.json",
      "rerun:@rerun.txt"
    ],
    parallel: parseInt(process.env.PARALLEL_WORKERS) || 4
  }
};
