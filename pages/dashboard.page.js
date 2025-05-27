//@ts-check
import { expect } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class Dashboard extends BasePage {
  constructor(page) {
    super(page);
    this.header = page.locator("div.oxd-topbar-header-title");
    this.sideMenu = page.locator("ul.oxd-main-menu li");
    this.profile = page
      .getByRole("banner")
      .getByRole("img", { name: "profile picture" });
  }
  getMenuitem = (/** @type {any} */ menuitem) =>
    this.page.getByRole("menuitem", { name: menuitem });
  getLink = (/** @type {any} */ linkName) =>
    this.page.getByRole("link", { name: linkName });

  async logOut() {
    await this.click(this.profile);
    await this.click(this.getMenuitem("Logout"));
  }
  async validateHeader(text) {
    await expect(this.header).toHaveText(text);
  }
  async getAllSideMenu() {
    return this.sideMenu;
  }
  async navigateToMenu(menuName) {
    await this.click(this.getLink(menuName));
  }
}
