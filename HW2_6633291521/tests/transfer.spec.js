import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { DepositPage } from "../page-objects/depositPage";
import { TransferPage } from "../page-objects/transferPage";
import validUser from "../test-data/users/valid-user.json";
import invalidUser from "../test-data/users/invalid-user.json";

test.describe("Test transfer", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(validUser[1]);
  });

  test("Verify transfer component", async ({ page }) => {
    await expect(page.getByText("โอนเงินTransfer")).toBeVisible();
    await page.getByText("โอนเงินTransfer").click();
    await expect(
      page.getByRole("heading", { name: "โอนเงิน", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "กลับ" })).toBeVisible();
    await expect(page.getByText("ยอดเงินคงเหลือปัจจุบัน")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "ข้อมูลการโอนเงิน" }),
    ).toBeVisible();
    await expect(
      page.getByText("หมายเลขบัญชีปลายทาง", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("จำนวนเงินด่วน")).toBeVisible();
    await expect(page.getByText("หรือกรอกจำนวนเงินเอง")).toBeVisible();
    await expect(page.getByText("หมายเหตุ (ไม่บังคับ)")).toBeVisible();
    await expect(page.getByRole("heading", { name: "คำแนะนำ:" })).toBeVisible();
  });

  test("Verify transfer pass with valid details", async ({ page }) => {
    const transfer = new TransferPage(page);
    await transfer.transferAmount({
      account: validUser[0].accountNumber,
      amount: "20000",
      note: "ค่าอาหาร",
    });

    await expect(
      page.getByRole("heading", { name: "สรุปการโอนเงิน:" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "โอนเงิน ฿" })).toBeVisible();
    await page.getByRole("button", { name: "โอนเงิน ฿" }).click();
    await expect(
      page.getByText("โอนเงินสำเร็จ", { exact: true }),
    ).toBeVisible();
  });

  test("Verify transfer fail with invalid account number", async ({ page }) => {
    const transfer = new TransferPage(page);
    await transfer.transferAmount({
      account: invalidUser[0].accountNumber,
      amount: "20000",
      note: "ค่าอาหาร",
    });

    await page.getByRole("button", { name: "โอนเงิน ฿" }).click();
    await expect(
      page.getByText("ไม่พบบัญชีปลายทาง", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("หมายเลขบัญชีที่กรอกไม่ถูกต้องหรือไม่มีอยู่ในระบบ", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("Verify transfer fail with own account number", async ({ page }) => {
    const transfer = new TransferPage(page);
    await transfer.transferAmount({
      account: validUser[1].accountNumber,
      amount: "20000",
      note: "ค่าอาหาร",
    });

    await page.getByRole("button", { name: "โอนเงิน ฿" }).click();
    await expect(
      page.getByText("ไม่สามารถโอนได้", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("ไม่สามารถโอนเงินให้ตนเองได้", { exact: true }),
    ).toBeVisible();
  });

  test("Verify transfer fail with invalid amount (<1)", async ({ page }) => {
    const transfer = new TransferPage(page);
    await transfer.transferAmount({
      account: validUser[0].accountNumber,
      amount: "0",
      note: "ค่าอาหาร",
    });

    await expect(
      page.getByRole("button", { name: "โอนเงิน ฿" }),
    ).toBeDisabled();
  });

  test("Verify transfer fail with invalid amount (>200000)", async ({
    page,
  }) => {
    const deposit = new DepositPage(page);
    await deposit.depositAmount({ amount: "100000" });
    await page.getByRole("button", { name: "กลับ" }).click();

    const transfer = new TransferPage(page);
    const amountInput = await transfer.transferValidationMessage({
      account: validUser[0].accountNumber,
      amount: "200001",
    });
    const isInvalid = await amountInput.evaluate((el) => !el.checkValidity());
    expect(isInvalid).toBe(true);
    const validationMessage = await amountInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(validationMessage).not.toBe("");
  });

  test("Verify transfer fail with excessive remaining balance", async ({
    page,
  }) => {
    const transfer = new TransferPage(page);
    await transfer.transferAmount({
      account: validUser[0].accountNumber,
      amount: "130000",
      note: "ค่าอาหาร",
    });

    await expect(
      page.getByRole("button", { name: "โอนเงิน ฿" }),
    ).toBeDisabled();
  });

  test("Verify transfer fail with remark exceeding limit", async ({ page }) => {
    const transfer = new TransferPage(page);
    const result = await transfer.transferWithExcessiveRemark({
      account: "123456",
      amount: "100",
      note: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    });
    expect(result.isLimited).toBe(true);
    expect(result.actualValue.length).toBeLessThanOrEqual(50);
  });
});
