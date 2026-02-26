export class TransferPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByText("โอนเงินTransfer").click();
  }

  async transferAmount({ account, amount, note }) {
    await this.open();
    await this.page
      .getByRole("textbox", { name: "กรอกหมายเลขบัญชี 6 หลัก" })
      .click();
    await this.page
      .getByRole("textbox", { name: "กรอกหมายเลขบัญชี 6 หลัก" })
      .fill(account);
    await this.page.getByPlaceholder("0").click();
    await this.page.getByPlaceholder("0").fill(amount);
    await this.page
      .getByRole("textbox", { name: "เช่น เงินค่าอาหาร, ค่าเช่าบ้าน" })
      .click();
    await this.page
      .getByRole("textbox", { name: "เช่น เงินค่าอาหาร, ค่าเช่าบ้าน" })
      .fill(note);
  }

  async transferValidationMessage({ account, amount }) {
    await this.open();
    await this.page
      .getByRole("textbox", { name: "กรอกหมายเลขบัญชี 6 หลัก" })
      .click();
    await this.page
      .getByRole("textbox", { name: "กรอกหมายเลขบัญชี 6 หลัก" })
      .fill(account);
    const amountInput = this.page.getByPlaceholder("0");
    await amountInput.click();
    await amountInput.fill(amount);
    return amountInput;
  }

  async transferWithExcessiveRemark({ account, amount, note }) {
    await this.open();
    const remarkField = this.page.getByRole("textbox", {
      name: "เช่น เงินค่าอาหาร, ค่าเช่าบ้าน",
    });
    await remarkField.click();
    await remarkField.fill(note);

    const actualValue = await remarkField.inputValue();
    return {
      originalNote: note,
      actualValue: actualValue,
      isLimited: actualValue.length <= 50 && note.length > 50,
    };
  }
}
