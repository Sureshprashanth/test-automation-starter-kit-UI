# Contributing Guide

Thank you for your interest in contributing to this Test Automation Starter Kit!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/test-automation-starter-kit.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Install dependencies: `npm install`

## Development Workflow

### Writing Tests

1. **Create Feature File** (Gherkin BDD syntax)
   ```gherkin
   @smoke
   Scenario: Test your feature
     Given some precondition
     When an action occurs
     Then verify expected outcome
   ```

2. **Create Page Object** (if new page)
   ```typescript
   export class YourPage extends BasePage {
     private element = () => this.page.locator('selector');
     
     async action() {
       await this.click(this.element());
     }
   }
   ```

3. **Create Step Definition**
   ```typescript
   When('some step {string}', async function(param: string) {
     await fixture.yourPage.action(param);
   });
   ```

### Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add logging via `fixture.logger.info()`

### Testing Your Changes

```bash
# Run tests with your changes
npm test

# Run specific tags
TAGS=@smoke npm test

# Run with debugging
npm run test:debug

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add new login test scenario
fix: Correct selector for dashboard button
docs: Update README with new instructions
refactor: Improve page object structure
test: Add additional edge case tests
```

## Pull Request Process

1. Update tests/features for any new functionality
2. Run full test suite: `npm test`
3. Ensure linting passes: `npm run lint`
4. Update README.md if needed
5. Push to your fork and create a Pull Request
6. Describe your changes clearly in the PR

### PR Title Format
```
[AREA] Brief description

Areas: feature, fix, docs, refactor, test
```

### PR Checklist
- [ ] Tests pass locally
- [ ] No new console warnings
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No hardcoded values (use env vars)

## Best Practices

✅ **DO:**
- Use Page Object Model pattern
- Keep steps reusable and DRY
- Add meaningful logging
- Use explicit waits, not Thread.sleep()
- Test one thing per scenario
- Use data-driven tests for multiple inputs

❌ **DON'T:**
- Hardcode URLs, credentials, or selectors
- Use Thread.sleep() for waiting
- Create long, complex scenarios
- Skip accessibility checks
- Ignore test failures—investigate root cause

## Questions?

1. Check existing GitHub issues
2. Review documentation in this repo
3. Open a new GitHub issue with details

---

Thank you for contributing! 🎉
