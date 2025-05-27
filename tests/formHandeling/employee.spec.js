import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";
const {
  getLoginName,
  getEmployeeID,
  getFirstName,
  getMiddleName,
  getLastName,
} = require("../../utility/utilities.js");
const {
  getEmployeeData,
  createEmployee,
} = require("../../helper/employee-helper.js");
import { LoginPage } from "../../pages/login.page.js";
import { Dashboard } from "../../pages/dashboard.page.js";
import { Employee } from "../../pages/employee.page.js";

test.describe.serial("Validate Employee registration feature", () => {
  let loginPage;
  /** @type { Dashboard } */
  let dashboard;
  /** @type { Employee } */
  let employee;
  let newLoginName;

  test.beforeEach("Login to application", async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    employee = new Employee(page);

    await loginPage.visit();
    await loginPage.loginToApp("Admin", "admin123");
    await page.waitForLoadState("networkidle");
    await dashboard.validateHeader("Dashboard");
  });

  test.afterEach("Log out of application", async ({ page }) => {
    await dashboard.logOut();
  });

  test("Validate employee registration and other activities", async ({
    page,
  }) => {
    await test.step("Add new Employee with profile picture", async () => {
      const option = getEmployeeData(false);
      await dashboard.navigateToMenu("PIM");
      await createEmployee(employee, option, false);
    });

    await test.step("Add new Employee with profile picture with login details", async () => {
      const option = getEmployeeData(true);
      newLoginName = option.loginName;
      await dashboard.navigateToMenu("PIM");
      await createEmployee(employee, option, true);
    });
  });
  
  test("Login to application with new credentials", async ({ page }) => {
    await loginPage.clearSession();
    await loginPage.loginToApp(newLoginName, "Test@123");
    await page.waitForLoadState("networkidle");
    await dashboard.validateHeader("Dashboard");
  });
});
