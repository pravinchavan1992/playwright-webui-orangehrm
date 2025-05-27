import { test, expect } from "../../fixtures/fixture.js";

test("Validate login functionality", async ({ loginPage, dashboard }) => {
  await loginPage.visit();
  await loginPage.loginToApp("Admin", "admin123");
  await dashboard.validateHeader("Dashboard");
});

test("Validate invalid login", async ({ loginPage }) => {
  await loginPage.visit();
  await loginPage.loginToApp("Admin", "admin1234");
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
});

test("Validate session expiry", async ({ loginPage }) => {
  await loginPage.visit();
  await loginPage.loginToApp("Admin", "admin123");
  await loginPage.clearSession();
  await loginPage.validateURL("web/index.php/auth/login");
});
