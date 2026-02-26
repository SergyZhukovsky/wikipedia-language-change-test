# Wikipedia Language Change — Automated Test

Playwright + TypeScript automated test that verifies an authenticated Wikipedia user can change their interface language via Preferences → User profile → Internationalisation.

## Test Case (TC-001)

**Preconditions:** Valid Wikipedia account with confirmed email, user is logged in.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in via MediaWiki API | Session cookies set |
| 2 | Navigate to Main Page, verify login | Username visible in user menu |
| 3 | Navigate to Special:Preferences | Preferences page loads |
| 4 | Go to User profile tab | Tab is active (`aria-selected="true"`) |
| 5 | Store current language, pick a random different one | Language selected from dropdown |
| 6 | Change language and click Save | Page reloads, setting persisted |
| 7 | Navigate to Main Page | `<html lang>` matches selected language |

## Prerequisites

- **Docker** and **Docker Compose** — for containerized execution
- **Node.js v18+** — for local execution
- **Wikipedia account** — [create here](https://en.wikipedia.org/wiki/Special:CreateAccount), confirm email, make at least one edit

## Setup

```bash
git clone https://github.com/SergyZhukovsky/wikipedia-language-change-test.git
cd wikipedia-language-change-test
cp .env.example .env
```

Edit `.env` and set your Wikipedia credentials (username, not email):

```
WIKI_USERNAME=YourUsername
WIKI_PASSWORD=YourPassword
```

## Running Tests

### Docker (recommended)

```bash
docker compose -f config/docker-compose.yml up --build
```

### Local

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

## Test Report

HTML report is generated in `playwright-report/` after each run. When running in Docker, the report is automatically available on the host via volume mount.

```bash
npx playwright show-report
```

## Project Structure

```
config/
├── Dockerfile               # Playwright image with browsers
├── docker-compose.yml       # Container config, .env, volume mounts
└── playwright.config.ts     # Test runner settings
src/
├── api/                     # API-based authentication (clientlogin)
├── fixture/                 # Playwright fixtures (page object injection)
├── pages/                   # Page Objects (BasePage, HomePage, SettingsPage, UserProfileTab)
├── tests/                   # Test specs
└── config.ts                # Environment config (dotenv)
```
