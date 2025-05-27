//@ts-check
import { expect } from "@playwright/test";

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  commonButton = (/** @type {any} */ buttonName) =>
    this.page.getByRole("button", { name: buttonName });

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.reload();
    await this.page.waitForLoadState("networkidle");
  }
  async validateURL(url) {
    return await expect(this.page).toHaveURL(url);
  }

  async waitForPageLoad(loadStrategy = "networkidle") {
    const validStrategies = ["load", "domcontentloaded", "networkidle"];

    if (!validStrategies.includes(loadStrategy)) {
      throw new Error(`Invalid load strategy: ${loadStrategy}`);
    }

    // @ts-ignore
    await this.page.waitForLoadState(loadStrategy);
  }

  async click(locator, options = {}) {
    const element =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({
      state: "visible",
      timeout: options.timeout ?? 5000,
    });
    await element.click(options);
  }

  async fillInput(locator, text, options = {}) {
    const element =
      typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.fill(text, options);
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async validateTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async waitForLoaderToDisappear(locator = ".oxd-loading-spinner") {
    const loaders = this.page.locator(locator);

    await expect
      .poll(
        async () => {
          const count = await loaders.count();
          for (let i = 0; i < count; i++) {
            const isHidden = await loaders.nth(i).isHidden();
            if (!isHidden) return false;
          }
          return true;
        },
        {
          intervals: [500],
          timeout: 120000,
        },
      )
      .toBe(true);
  }
}
