# UI Testing Project with Playwright

A beginner-friendly UI automation project in this repository.

## Repository Description

This repository demonstrates a complete, minimal UI test automation workflow using Playwright.
It includes a simple static web app (`demo-app/`) and an automated test suite (`tests/ui.spec.js`) that validates core user behavior:

- page render and heading visibility,
- guest greeting when input is empty,
- personalized greeting when a name is provided.

The project is intended for learning, demo, and starter-template use cases where teams need a fast way to understand Playwright setup, local app hosting for tests, and HTML reporting.

This project demonstrates:

- Playwright end-to-end UI testing
- Auto-starting a local static app before tests
- HTML reporting with Playwright

---

## Quick Start (4 Commands)

Run from repository root:

```bash
cd ui-playwright-tests
npm install
npx playwright install chromium
npm run test:ui
```

After execution, open the HTML report:

```bash
npm run report
```

---

## 1) Project Structure

- `demo-app/` → Static UI used for test automation
- `tests/` → Playwright test specs
- `playwright.config.js` → Playwright runner configuration
- `package.json` → Scripts and dependencies

---

## 2) What Is Used

- Node.js 20+
- `@playwright/test`
- `http-server` to host the demo UI during test execution

---

## 3) Prerequisites

1. Node.js 20 or newer
2. npm

Verify:

```bash
node -v
npm -v
```

---

## 4) Install Dependencies

```bash
cd ui-playwright-tests
npm install
```

Install browser binaries used by Playwright:

```bash
npx playwright install chromium
```

---

## 5) Run UI Tests

Headless run:

```bash
npm run test:ui
```

Headed run:

```bash
npm run test:ui:headed
```

Debug mode:

```bash
npm run test:ui:debug
```

---

## 6) Reports and Artifacts

Playwright creates:

- `playwright-report/` → HTML report
- `test-results/` → traces/screenshots/videos for failed tests

Open report:

```bash
npm run report
```

---

## 7) Included Example Test Cases

Current sample suite includes:

1. Verify page heading is visible
2. Verify empty input returns `Hello, Guest!`
3. Verify typed input returns personalized greeting

---

## 8) Troubleshooting

### Browser not installed error

```bash
npx playwright install chromium
```

### Port `4173` already in use

Stop the process using that port, then run tests again.

### `npm` command not found

Install Node.js and restart terminal.

---

## 9) Next Improvements

- Add cross-browser projects (Firefox/WebKit)
- Add GitHub Actions workflow for UI test execution
- Add visual regression snapshots

---

## 10) Requirements and Test Case Documentation

- App requirements: `docs/app-requirements.md`
- UI test cases: `docs/ui-test-cases.md`

---

## 11) How the App Was Tested

Testing was executed with Playwright using the Chromium project configured in `playwright.config.js`.

### Test approach

- The static app in `demo-app/` is auto-hosted via Playwright `webServer` on port `4173`.
- Tests are implemented in `tests/ui.spec.js` and run against `http://127.0.0.1:4173`.
- Assertions cover page render and greeting behavior for both empty and non-empty input.

### Commands used

```bash
npm install
npx playwright install chromium
npm run test:ui
```

### Executed checks

1. Home page heading is visible.
2. Empty name input returns `Hello, Guest!`.
3. Entered name returns personalized greeting (example: `Hello, Rahul!`).

### Evidence and artifacts

- Console list reporter output during execution.
- HTML report generated in `playwright-report/`.
- Retry artifacts (trace, screenshot, video on failure) in `test-results/`.
