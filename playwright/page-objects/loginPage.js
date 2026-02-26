export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login({ accountNumber, pin }) {
    await this.page.goto("https://atm-buddy-lite.lovable.app/");
    await this.page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
    await this.page
      .getByRole("textbox", { name: "ตัวอย่าง:" })
      .fill(accountNumber);
    await this.page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
    await this.page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill(pin);
    await this.page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  }
}
