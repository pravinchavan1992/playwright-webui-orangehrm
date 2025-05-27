import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page.js";
import { Dashboard } from "../../pages/dashboard.page.js";

test.describe.parallel("Validate navigation menus on dashboard", () => {
  /** @type {Dashboard} */
  let dashboard;

  test.beforeEach("Login to application", async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    await loginPage.visit();
    await loginPage.loginToApp("Admin", "admin123");
    await dashboard.validateHeader("Dashboard");
  });

  test("Validate dashboard menus", async ({ page }) => {
    await test.step("Validate link counts", async () => {
      const sideMenu = await dashboard.getAllSideMenu();
      await expect(sideMenu).toHaveCount(12)
    });

    await test.step("Validate link names", async () => {
      const expectedMenus = [
        "Admin",
        "PIM",
        "Leave",
        "Time",
        "Recruitment",
        "My Info",
        "Performance",
        "Dashboard",
        "Directory",
        "Maintenance",
      ];
      const linkMenu = page.locator("ul.oxd-main-menu li");

      for (const menu of expectedMenus) {
        await expect
          .soft(linkMenu.getByRole("link", { name: menu }))
          .toBeVisible();
      }

      expect(test.info().errors).toHaveLength(0);
    });
  });
});
