# Playwright + Allure demo (GA params & Dark Mode persistence) - JavaScript

**Tech Stack**

1) Playwright → browser automation & testing framework

2) JavaScript (ESM) → test implementation language

3) Page Object Model (OOP) → modular & maintainable structure

4) Allure Playwright → advanced test reporting (steps, screenshots, annotations)

5) Prettier → code formatting

6) ESLint → code linting, enforces best practices

7) Node.js 18+ → runtime environment

8) Allure Commandline → generate & open rich HTML test reports


Setup Instructions
1. Clone or extract the Repo and move to the project directory

2. **Install dependencies**
npm install

3.** Install Playwright browsers**
npx playwright install --with-deps

**Running Tests**

**Run all tests:**

npm test

**Run a single suite:**

1) npx playwright test tests/politics.ga.spec.js
2) npx playwright test tests/newscientist.darkmode.spec.js


**Run headed mode (see browser):**

npm run test:headed

**Allure Reports**

**Generate the report:**

npm run allure:generate

**Open in browser:**

npm run allure:open

**Sample Allure report: **

<img width="1704" height="799" alt="image" src="https://github.com/user-attachments/assets/0c3486d9-d438-4ce3-ad7c-6d1cd70089f9" />


<img width="1708" height="892" alt="image" src="https://github.com/user-attachments/assets/c9b7ddab-cf88-421b-a7fe-9cca0edadfb3" />


