//@ts-check

import path from "path";
import { BasePage } from "./base.page";
import { expect } from "@playwright/test";

export class Employee extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.fName = page.getByPlaceholder("First Name");
    this.mName = page.getByPlaceholder("Middle Name");
    this.lName = page.getByPlaceholder("Last Name");
    this.empId = page.locator("input.oxd-input").nth(4);
    this.uploadInput = page.locator('input[type="file"]');
    this.createLoginButton = page
      .getByText("Create Login Details")
      .locator("..")
      .locator("span");
    this.loginName = page.locator('input[autocomplete="off"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.statusEnabled = page.locator("label:has-text('Enabled') span");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.successToast = page.locator(".oxd-text--toast-message");
  }

  getTextBox = (placeHolderName) => this.page.getByPlaceholder(placeHolderName);

  async navigateToAddEmployee() {
    await this.commonButton("Add").waitFor({ state: "visible" });
    await this.click(this.commonButton("Add"));
  }

  async addEmployee(params = {}, withLogin = false) {
    await this.navigateToAddEmployee();

    await this.fillInput(this.fName, params.fName);
    await this.fillInput(this.mName, params.mName);
    await this.fillInput(this.lName, params.lName);
    await this.fillInput(this.empId, params.empId);

    const filePath = path.resolve("user.jpeg");
    await this.uploadInput.setInputFiles(filePath);

    if (withLogin) {
      await this.click(this.createLoginButton);
      await this.fillInput(this.loginName, params.loginName);
      await this.fillInput(this.passwordInput, "Test@123");
      await this.fillInput(this.confirmPasswordInput, "Test@123");
      await this.statusEnabled.click();
    }
    await this.click(this.saveButton);
    await this.verifyToastMessage();
    //await this.waitForLoaderToDisappear();
  }

  async verifyToastMessage() {
    await expect.poll(async ()=> {
      return await this.successToast.isVisible()
      ? await this.successToast.textContent()
      : null
    }, {
      intervals: [1000, 2000, 5000],
      timeout: 60000
    }).toBe('Successfully Saved');
  }
}
