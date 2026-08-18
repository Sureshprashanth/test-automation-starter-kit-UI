# Test Automation Starter Kit

A professional, production-ready test automation framework built with **Playwright**, **Cucumber**, and **TypeScript**. This starter kit provides a solid foundation for building scalable, maintainable automated tests with best practices baked in.

## 🎯 Features

- **BDD Framework**: Gherkin-based feature files for readable, business-friendly test scenarios
- **Page Object Model**: Clean separation of test logic and UI interactions
- **Multi-Environment Support**: Seamlessly switch between local, staging, and production environments
- **Parallel Execution**: Run tests in parallel for faster feedback
- **Comprehensive Reporting**: HTML reports with screenshots and detailed logs
- **TypeScript**: Full type safety and modern development experience
- **CI/CD Ready**: GitHub Actions workflow included
- **Error Handling**: Retry logic and detailed failure screenshots
- **Logging**: Winston-based logging for debugging and monitoring
- **Docker Support**: Containerized test execution

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: For version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Sureshprashanth/test-automation-starter-kit.git
cd test-automation-starter-kit
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Environment
ENV=local

# Base URLs
BASE_URL_LOCAL=http://localhost:3000
BASE_URL_STAGING=https://staging.example.com
BASE_URL_PROD=https://example.com

# Browser Configuration
BROWSER=chromium
HEADED=false
SLOW_MO=0

# Parallel Workers
PARALLEL_WORKERS=4

# Tags to run (optional)
TAGS=@smoke
```

### 4. Run Tests
```bash
# Run all tests
npm test

# Run specific tags
TAGS=@smoke npm test

# Run in headed mode (see browser)
npm run test:headed

# Run with debugging
npm run test:debug

# Retry failed tests
npm run test:retry
```

### 5. View Reports
```bash
npm run report:open
```

## 📁 Project Structure

```
test-automation-starter-kit/
├── src/
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.ts
│   │   └── LoginPage.ts
│   ├── test/
│   │   ├── steps/            # Step definitions
│   │   ├── features/         # Gherkin feature files
│   │   └── support/          # Test utilities
│   ├── helper/
│   │   ├── browsers/         # Browser & context management
│   │   ├── report/           # Reporting utilities
│   │   └── util/             # Common utilities
│   └── hooks/                # Cucumber hooks (before/after)
├── config/
│   └── cucumber.js           # Cucumber configuration
├── test-results/             # Generated test reports
├── .github/
│   └── workflows/
│       └── tests.yml         # GitHub Actions CI/CD
├── .env.example              # Environment template
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🔑 Key Patterns

### Page Object Model
```typescript
import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput = () => this.page.locator('input[name="username"]');
  private passwordInput = () => this.page.locator('input[name="password"]');
  private loginButton = () => this.page.locator('button:has-text("Login")');

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await this.page.waitForLoadState('networkidle');
  }
}
```

### Feature File (Gherkin)
```gherkin
Feature: User Login
  As a user
  I want to log in to the application
  So that I can access my account

  @smoke @login
  Scenario: Successful login with valid credentials
    Given User navigates to login page
    When User enters username "valid_user"
    And User enters password "valid_password"
    And User clicks login button
    Then User should be redirected to dashboard
```

### Step Definition
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../hooks/pageFixture';

Given('User navigates to login page', async function() {
  await fixture.loginPage.navigateTo();
});

When('User enters username {string}', async function(username: string) {
  await fixture.loginPage.enterUsername(username);
});
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENV` | Environment to test | `local` |
| `BASE_URL_*` | Application URLs | localhost:3000 |
| `BROWSER` | Browser to use | `chromium` |
| `HEADED` | Show browser UI | `false` |
| `PARALLEL_WORKERS` | Number of parallel workers | `4` |
| `TAGS` | Cucumber tags filter | - |

### Cucumber Tags

```gherkin
@smoke        # Quick smoke tests
@regression   # Full regression suite
@critical     # Business-critical flows
@skip         # Skip these tests
```

## 📊 Reports

The framework generates comprehensive HTML reports with:
- Test execution summary
- Pass/fail statistics
- Detailed scenario steps
- Screenshots on failures
- Execution time metrics
- JSON report for CI integration

Reports are generated in `test-results/` after each run.

## 🔄 CI/CD Integration

The included GitHub Actions workflow (`.github/workflows/tests.yml`) runs tests on:
- Push to main/develop branches
- Pull request creation
- Manual trigger

### Workflow Features
- Runs on Ubuntu latest
- Node.js caching
- Parallel test execution
- Artifact upload (reports, videos, traces)
- Slack notifications (optional)

## 🐳 Docker Support

Build and run tests in Docker:
```bash
docker build -t test-automation .
docker run test-automation npm test
```

## 📚 Best Practices Included

✅ **Page Object Model** - Encapsulation of UI interactions  
✅ **Explicit Waits** - Wait for elements, not time delays  
✅ **Data Management** - Test data separation  
✅ **Error Handling** - Comprehensive error messages  
✅ **Logging** - Detailed execution logs  
✅ **Reusable Steps** - DRY principle in step definitions  
✅ **Configuration Management** - Environment-based configs  
✅ **Screenshot Capture** - On failure for debugging  
✅ **Retry Logic** - Flaky test mitigation  
✅ **TypeScript** - Type safety and intellisense  

## 🧪 Example Test Walkthrough

1. **Write Feature** (Gherkin syntax)
```gherkin
@smoke
Scenario: User can add item to cart
  Given User is on product page
  When User clicks add to cart button
  Then Item should be added to cart
  And Cart count should increase by 1
```

2. **Write Page Object**
```typescript
export class ProductPage {
  async addToCart() {
    await this.addToCartButton().click();
  }
}
```

3. **Write Step Definition**
```typescript
When('User clicks add to cart button', async function() {
  await fixture.productPage.addToCart();
});
```

4. **Run Test**
```bash
npm test
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-tests`)
2. Commit changes (`git commit -m 'Add amazing tests'`)
3. Push to branch (`git push origin feature/amazing-tests`)
4. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 💡 Tips & Tricks

### Running Specific Tests
```bash
# By tag
TAGS=@smoke npm test

# Specific feature file
npx cucumber-js src/test/features/login.feature

# With parallel workers
PARALLEL_WORKERS=8 npm test
```

### Debugging
```bash
# Headed mode with visual browser
npm run test:headed

# Step-by-step debugging
npm run test:debug

# View live traces
npx playwright show-trace trace.zip
```

### Performance
```bash
# Record video for debugging
RECORD_VIDEO=true npm test

# Generate trace files
RECORD_TRACE=true npm test
```

## 🆘 Troubleshooting

**Tests timeout?**
- Increase timeout in `config/cucumber.js`
- Check network connectivity
- Verify BASE_URL is correct

**Chrome/Chromium not found?**
```bash
npx playwright install chromium
```

**Permission denied errors?**
```bash
chmod +x node_modules/.bin/*
```

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Review step-by-step examples in `src/test/features/`
3. Check logs in `.logs/` directory
4. Open a new GitHub issue with details

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built with ❤️ for QA Engineers**
