import { test, expect } from "../../fixtures/fixture.js";
const fs = require("fs/promises");
const path = require("path");
const {
  getEmployeeData,
  createEmployee,
  loginToApp,
  logOut,
} = require("../../helper/employee-helper.js");

test.describe.serial("Validate Employee registration feature", () => {
  const loginNameFile = "new-login-name.txt";
  const loginNamePath = path.resolve(__dirname, "../../tmp", loginNameFile);
  test.beforeEach("Login to application", async ({ loginPage, dashboard }) => {
    await loginToApp(loginPage, dashboard, "Admin", "admin123");
  });

  test.afterEach("Log out of application", async ({ dashboard }) => {
    await logOut(dashboard);
  });

  test("Validate employee registration and other activities", async ({
    dashboard,
    employeePage,
  }) => {
    await test.step("Add new Employee with profile picture", async () => {
      const option = getEmployeeData(false);
      await dashboard.navigateToMenu("PIM");
      await createEmployee(employeePage, option, false);
    });

    await test.step("Add new Employee with profile picture with login details", async () => {
      const option = getEmployeeData(true);
      await fs.mkdir(path.dirname(loginNamePath), { recursive: true });
      await fs.writeFile(loginNamePath, option.loginName, "utf-8");
      await dashboard.navigateToMenu("PIM");
      await createEmployee(employeePage, option, true);
    });
  });

  test("Login to application with new credentials", async ({
    loginPage,
    dashboard,
  }) => {
    const newLoginName = await fs.readFile(loginNamePath, "utf-8");
    await loginPage.clearSession();
    await loginPage.loginToApp(newLoginName, "Test@123");
    await loginPage.waitForPageLoad();
    await dashboard.validateHeader("Dashboard");
  });
});

test("@Smoke Validate new login creation and login with fixture", async ({
  newEmployeeLogin,
  loginPage,
  dashboard,
}) => {
  await loginPage.clearSession();
  await loginPage.loginToApp(
    newEmployeeLogin.loginName,
    newEmployeeLogin.password,
  );
  await loginPage.waitForPageLoad();
  await dashboard.validateHeader("PIM");
});
