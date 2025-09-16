# Playwright + Allure demo (GA params & Dark Mode persistence) - JavaScript

Tech Stack

Playwright → browser automation & testing framework

JavaScript (ESM) → test implementation language

Page Object Model (OOP) → modular & maintainable structure

Allure Playwright → advanced test reporting (steps, screenshots, annotations)

Prettier → code formatting

ESLint → code linting, enforces best practices

Node.js 18+ → runtime environment

Allure Commandline → generate & open rich HTML test reports


Setup Instructions
1. Clone or extract



2. Install dependencies
npm install

3. Install Playwright browsers
npx playwright install --with-deps

▶️ Running Tests

Run all tests:

npm test




Run a single suite:

npx playwright test tests/politics.ga.spec.js
npx playwright test tests/newscientist.darkmode.spec.js


Run headed mode (see browser):

npm run test:headed

📊 Allure Reports

Generate the report:

npm run allure:generate


Open in browser:

npm run allure:open

