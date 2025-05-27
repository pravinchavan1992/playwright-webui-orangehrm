import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page.js";
import { Dashboard } from "../../pages/dashboard.page.js";

test("Validate login functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashborad = new Dashboard(page);
  await loginPage.visit();
  await loginPage.loginToApp("Admin", "admin123");
  await dashborad.validateHeader("Dashboard");
});

test("Validate invalid login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.loginToApp("Admin", "admin1234");
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
});

test("Validate session expiry", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.loginToApp("Admin", "admin123");
  await loginPage.clearSession();
  await expect(page).toHaveURL("web/index.php/auth/login");
});
