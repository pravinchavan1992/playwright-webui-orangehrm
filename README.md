# Playwright WebUI Automation for OrangeHRM

Automated end-to-end UI testing project for the [OrangeHRM Open Source](https://opensource-demo.orangehrmlive.com/) application using [Playwright](https://playwright.dev/) with JavaScript.

---

## 📁 Folder Structure

| Folder/File       | Description |
|-------------------|-------------|
| `tests/`          | Test specs (login, dashboard, etc.) |
| `pages/`          | Page Object Model (POM) classes |
| `fixtures/`       | Static test data |
| `helper/`         | Custom helper functions |
| `utils/`          | Shared utilities |
| `reporter/`       | Custom reporting (optional) |
| `.github/workflows/` | GitHub Actions CI/CD workflows |
| `playwright.config.js` | Playwright configuration |
| `package.json`    | Project metadata and dependencies |

---

## ⚙️ Installation

```bash
git clone https://github.com/pravinchavan1992/playwright-webui-orangehrm.git
cd playwright-webui-orangehrm
npm install
npx playwright install
```

## ▶️ Running Tests

### Run all tests:
```bash 
npx playwright test
```
### Run a single test file:
```bash
npx playwright test tests/login.spec.js
```
### Run with a specific browser:
```bash
npx playwright test --project=chromium
```
## 📊 Reports
### Generate and view test report:
```bash
npx playwright show-report
```

## 🚀 Features Covered
```
1. User authentication (login/logout)

2. Admin panel access

3. Employee management

4. Form validation

5. File upload/download

6. UI sync and wait conditions

7. Cross-browser compatibility
```

## 🔄 Continuous Integration
```
1. GitHub Actions workflow runs tests on push/pull request.

2. YAML config is located under .github/workflows/.
```

## ✅ Best Practices
```
1. Follows POM (Page Object Model)

2. Organized structure for scalability

3. Reusable fixtures and helpers

4. Code linted with ESLint

5. Formatting with Prettier
```

## 🤝 Contributing
```
1. Fork the repo

2. Create a new feature branch

3. Push your changes

4. Open a pull request
```
