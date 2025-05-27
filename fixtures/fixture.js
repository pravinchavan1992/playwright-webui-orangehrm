import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { Dashboard } from "../pages/dashboard.page.js";
import { Employee } from "../pages/employee.page.js";
import fs from "fs/promises";
import path from "path";
const {
  getEmployeeData,
  createEmployee,
} = require("../helper/employee-helper.js");

const loginNameFile = "new-login-name.txt";
const loginNamePath = path.resolve(__dirname, "../../tmp", loginNameFile);

exports.test = test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboard: async ({ page }, use) => {
    await use(new Dashboard(page));
  },
  employeePage: async ({ page }, use) => {
    await use(new Employee(page));
  },

  newEmployeeLogin: async ({ dashboard, employeePage, loginPage }, use) => {
    await loginPage.visit();
    await loginPage.loginToApp("Admin", "admin123");
    await loginPage.waitForPageLoad();
    await dashboard.validateHeader("Dashboard");

    const option = getEmployeeData(true);

    await dashboard.navigateToMenu("PIM");
    await fs.mkdir(path.dirname(loginNamePath), { recursive: true });
    await createEmployee(employeePage, option, true);
    await fs.writeFile(loginNamePath, option.loginName, "utf-8");

    await use({ loginName: option.loginName, password: "Test@123" });

    await dashboard.logOut();
  },
});

exports.expect = expect;
