export class DepositPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByText("ฝากเงินDeposit").click();
  }

  async depositAmount({ amount }) {
    await this.open();
    await this.page.getByPlaceholder("0").click();
    await this.page.getByPlaceholder("0").fill(amount);
  }

  async depositValidationMessage({ amount }) {
    await this.open();
    const amountInput = this.page.getByPlaceholder("0");
    await amountInput.click();
    await amountInput.fill(amount);
    return amountInput;
  }
}
