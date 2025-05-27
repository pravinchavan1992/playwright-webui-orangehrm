import { test, expect } from "../../fixtures/fixture.js";

test.describe.parallel("Validate navigation menus on dashboard", () => {
  test.beforeEach("Login to application", async ({ loginPage, dashboard }) => {
    await loginPage.visit();
    await loginPage.loginToApp("Admin", "admin123");
    await dashboard.validateHeader("Dashboard");
  });

  test("Validate dashboard menus", async ({ dashboard }) => {
    await test.step("Validate link counts", async () => {
      const sideMenu = await dashboard.getAllSideMenu();
      await expect(sideMenu).toHaveCount(12);
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
      const linkMenu = await dashboard.getAllSideMenu();

      for (const menu of expectedMenus) {
        await expect
          .soft(linkMenu.getByRole("link", { name: menu }))
          .toBeVisible();
      }

      expect(test.info().errors).toHaveLength(0);
    });
  });
});
