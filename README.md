# Wikipedia Language Change — Automated Test

Playwright + TypeScript automated test that verifies an authenticated Wikipedia user can change their interface language via Preferences.

## Project Structure

```
src/
├── api/
│   └── wiki-auth.ts        # MediaWiki clientlogin API authentication
├── fixture/
│   └── fixture.ts           # Playwright test fixtures (Page Object injection)
├── pages/
│   ├── login.page.ts        # LoginPage — authentication & login verification
│   └── preferences-tab.page.ts  # PreferencesPage — language settings management
├── tests/
│   └── change-language.spec.ts
└── config.ts                # Environment-based configuration
```

## Test Case

| ID | TC-001 |
|---|---|
| **Title** | Change Wikipedia interface language |
| **Preconditions** | Valid Wikipedia account with confirmed email |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in via API with valid credentials | Session cookies set |
| 2 | Verify login success | Username visible in the header |
| 3 | Navigate to Special:Preferences | Preferences page loads |
| 4 | Store current language, pick random different one | Available languages fetched from dropdown |
| 5 | Change language to the randomly selected one | Dropdown value updates |
| 6 | Click Save | Page reloads with new language applied |
| 7 | Assert language changed | Current language matches selected |
| 8 | Revert to original language | Dropdown value updates |
| 9 | Click Save | Page reloads |
| 10 | Assert original language restored | Language matches original value |

## Prerequisites

- **Docker** and **Docker Compose** installed
- A **Wikipedia account** (create at https://en.wikipedia.org/wiki/Special:CreateAccount)

## Setup

### 1. Create a Wikipedia account

If you don't have one yet, register at https://en.wikipedia.org/wiki/Special:CreateAccount.

**Important:** after creating a new account, you must do the following before tests will work:

1. **Confirm your email** — check your inbox and click the confirmation link
2. **Make at least one edit** — new accounts with zero edits may trigger additional CAPTCHA checks
3. **Wait a few minutes** — Wikipedia may temporarily restrict new accounts from rapid API logins

The test uses the MediaWiki `clientlogin` API to authenticate. This avoids the CAPTCHA on the standard login form, but Wikipedia may still reject logins from brand-new accounts with no activity.

### 2. Configure credentials

```bash
# Clone the repository
git clone <repo-url> && cd test

# Create .env from template
cp .env.example .env

# Edit .env and set WIKI_USERNAME and WIKI_PASSWORD
# Use your main Wikipedia username and password (not email)
```

## Running Tests

### Docker (recommended)

```bash
bash run-tests.sh
```

### Local

```bash
npm install
npx playwright install --with-deps chromium
npm test

# Headed mode (visible browser)
npm run test:headed
```

## Report

After running tests, open the HTML report:

```bash
# Local
npm run report

# Or open directly
open playwright-report/index.html
```

The report is located at `playwright-report/index.html`.

## Trace

Trace is enabled for every test run (`trace: 'on'`). Trace files are saved in `test-results/` and can be viewed with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Or open them in the [Trace Viewer](https://trace.playwright.dev) online.
