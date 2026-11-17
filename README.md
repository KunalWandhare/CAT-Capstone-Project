# Playwright E-Commerce Automation Framework

Enterprise-grade test automation framework for [automationexercise.com](https://automationexercise.com/) built with Playwright and TypeScript.

## Framework Architecture

```
playwright-ecommerce-framework/
├── config/              # Environment configuration
│   └── env.config.ts    # Base URL, timeouts, browser settings
├── fixtures/            # Custom Playwright fixtures
│   └── page-fixtures.ts # Typed page object fixtures and test data injection
├── pages/               # Page Object Model classes
│   ├── base.page.ts     # Shared navigation and common actions
│   ├── home.page.ts     # Homepage interactions
│   ├── login.page.ts    # Login and signup forms
│   ├── signup.page.ts   # Registration form
│   ├── account-created.page.ts
│   ├── products.page.ts # Product listing and search
│   ├── product-detail.page.ts
│   ├── cart.page.ts     # Shopping cart management
│   ├── checkout.page.ts # Checkout order review
│   ├── payment.page.ts  # Payment form
│   └── contact-us.page.ts
├── tests/               # Test specifications
│   ├── auth.spec.ts           # Registration, login, logout
│   ├── product-search.spec.ts # Search and product browsing
│   ├── cart.spec.ts           # Add/remove cart items
│   ├── checkout.spec.ts       # Full checkout and order placement
│   ├── contact-us.spec.ts     # Contact form validation
│   ├── network-mock.spec.ts   # API interception and mocking
│   ├── accessibility.spec.ts  # axe-core WCAG scanning
│   └── visual-regression.spec.ts # Screenshot comparison
├── testdata/            # External test data (JSON)
│   ├── users.json       # Registration and login credentials
│   ├── products.json    # Search terms and contact messages
│   └── payment.json     # Payment card details
├── utils/               # Reusable helpers
│   └── test-data-helper.ts # JSON loader, unique email generator
├── reports/             # Generated HTML reports, screenshots, traces
├── playwright.config.ts # Cross-browser config with 3 projects
└── tsconfig.json
```

## Design Decisions

### Page Object Model (POM)
Every page has a dedicated class inheriting from `BasePage`. The base class encapsulates the shared header navigation (Home, Products, Cart, Login, Logout, Contact Us) so tests never reference raw locators directly. This makes tests readable and locator changes require updates in one place only.

### Custom Fixtures
The `page-fixtures.ts` file extends Playwright's `test` object with typed page objects and test data. Tests declare what they need (`{ homePage, loginPage, userData }`) and the fixture system provides initialized instances. This eliminates boilerplate constructor calls and ensures consistent setup.

### Data-Driven Testing
Test data lives in `testdata/` as JSON files, loaded via `test-data-helper.ts`. The product search test iterates over multiple search terms from `products.json`. Registration uses timestamped emails via `uniqueEmail()` to avoid collisions. This separates data from logic, making it easy to add new scenarios without touching test code.

### Locator Strategy
We prioritize `data-qa` attributes (e.g., `[data-qa="login-email"]`) as primary selectors since they are stable and test-specific. For elements without `data-qa`, we use semantic locators: `h2:has-text(...)`, `a[href="..."]`, and `#id` selectors. We avoid fragile CSS class selectors or XPath where possible.

### Network Interception
The `network-mock.spec.ts` demonstrates three patterns: response mocking (substituting API responses), request capture (logging network activity), and error simulation (testing graceful degradation). This uses Playwright's `page.route()` API for deterministic control over network behavior.

### Accessibility Testing
We integrate `@axe-core/playwright` to scan pages against WCAG 2.0 Level A and AA criteria. Tests log violation details (id, impact, description, node count) for debugging. Since this is a third-party site, we verify the scan executes correctly and report findings rather than hard-failing on violation count.

### Visual Regression
Playwright's built-in `toHaveScreenshot()` captures baseline screenshots on first run and compares subsequent runs pixel-by-pixel. The `maxDiffPixelRatio: 0.05` threshold allows minor rendering differences across runs while catching significant visual changes.

### Cross-Browser Execution
`playwright.config.ts` defines three projects: Chromium, Firefox, and WebKit. Tests run against all three with `npm run test:all`, or individually with `npm run test:firefox` / `npm run test:webkit`.

## Running Tests

```bash
# Install dependencies
npm install
npx playwright install

# Run all tests on Chromium (default)
npm test

# Run on all browsers
npm run test:all

# Run on a specific browser
npm run test:firefox
npm run test:webkit

# Run in headed mode (visible browser)
npm run test:headed

# Run with Playwright debugger
npm run test:debug

# Open interactive UI mode
npm run test:ui

# Update visual regression baselines
npm run update:snapshots

# View HTML report
npm run report
```

## Configuration

Environment variables override defaults in `config/env.config.ts`:

| Variable   | Default                              | Description           |
|------------|--------------------------------------|-----------------------|
| `BASE_URL` | `https://automationexercise.com`     | Application URL       |
| `TIMEOUT`  | `30000`                              | Global test timeout   |
| `RETRIES`  | `1`                                  | Retry count on failure|
| `HEADLESS` | `true`                               | Run headless          |

## Reports and Debugging

- **HTML Reports**: Generated in `reports/html-report/` after each run
- **Screenshots**: Captured on failure in `test-results/`
- **Traces**: Saved on failure; open with `npx playwright show-trace <trace.zip>`
- **Trace Viewer**: Run `npm run test:debug` to step through tests interactively

## Test Coverage Summary

| Area                    | Test File              | Scenarios |
|-------------------------|------------------------|-----------|
| Registration/Login/Logout | auth.spec.ts          | 3         |
| Product Search/Browse   | product-search.spec.ts | 3         |
| Cart Add/Remove         | cart.spec.ts           | 3         |
| Checkout/Order Placement| checkout.spec.ts       | 1         |
| Contact Us Form         | contact-us.spec.ts     | 2         |
| Network Mocking         | network-mock.spec.ts   | 3         |
| Accessibility (axe-core)| accessibility.spec.ts  | 3         |
| Visual Regression       | visual-regression.spec.ts | 3      |

**Total: 21 test cases across 8 spec files**

## AI Tool Usage

GitHub Copilot was used as a productivity aid during development. Below is how it was leveraged and where manual improvements were made:

| Area | What Copilot Suggested | What I Changed |
|---|---|---|
| Locators | Generic CSS selectors | Replaced with stable `data-qa` attributes after inspecting the live DOM |
| Page objects | Flat page classes | Added `BasePage` inheritance to centralize shared navigation and reduce duplication |
| Test data | Inline hardcoded values | Moved to external JSON files with a helper that generates unique emails per run |
| Dialog handling | `page.on('dialog')` registered globally | Switched to `page.once()` to avoid duplicate handler errors in data-driven loops |
| Network mocking | Used `page.request` API (bypasses route interception) | Rewrote to use `page.goto()` so `page.route()` actually intercepts the request |
| Accessibility | Hard assertion on violation count | Changed to log-and-report since this is a third-party site we don't control |
