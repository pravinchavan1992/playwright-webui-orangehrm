import { BasePage } from "./base.page.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.errorMessage = this.page
      .getByRole("alert")
      .locator("div") 
      .filter({ hasText: "Invalid credentials" });
  }

  getLoginInputfield = (placeholder) => this.page.getByPlaceholder(placeholder);

  async visit() {
    await this.page.goto("/web/index.php/auth/login");
  }

  async isErrorMessageVisible() {
    await this.errorMessage.waitFor({ state: "visible"});
    return await this.errorMessage.isVisible();
  }

  async loginToApp(username, password) {
    await this.fillInput(this.getLoginInputfield("Username"), username);
    await this.fillInput(this.getLoginInputfield("Password"), password);
    await this.click(this.loginButton);
  }
}
