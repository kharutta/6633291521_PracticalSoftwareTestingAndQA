import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { WithdrawalPage } from "../page-objects/withdrawalPage";
import { DepositPage } from "../page-objects/depositPage";
import validUser from "../test-data/users/valid-user.json";

test.describe("Test deposit", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(validUser[0]);
  });

  test("Verify withdrawal component", async ({ page }) => {
    await expect(page.getByText("ถอนเงินWithdrawal")).toBeVisible();
    await page.getByText("ถอนเงินWithdrawal").click();
    await expect(page.getByRole("heading", { name: "ถอนเงิน" })).toBeVisible();
    await expect(page.getByRole("button", { name: "กลับ" })).toBeVisible();
    await expect(page.getByText("ยอดเงินคงเหลือปัจจุบัน")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "กรอกจำนวนเงินที่ต้องการถอน" }),
    ).toBeVisible();
    await expect(page.getByText("จำนวนเงินด่วน")).toBeVisible();
    await expect(page.getByText("หรือกรอกจำนวนเงินเอง")).toBeVisible();
    await expect(page.getByRole("heading", { name: "คำแนะนำ:" })).toBeVisible();
  });

  test("Verify withdrawal pass with valid amount", async ({ page }) => {
    const withdrawal = new WithdrawalPage(page);
    await withdrawal.withdrawAmount({ amount: "10000" });

    await expect(page.getByText("ยอดเงินหลังถอน:")).toBeVisible();
    await expect(page.getByRole("button", { name: "ถอนเงิน ฿" })).toBeVisible();
    await page.getByRole("button", { name: "ถอนเงิน ฿" }).click();
    await expect(
      page.getByText("ถอนเงินสำเร็จ", { exact: true }),
    ).toBeVisible();
  });

  test("Verify withdrawal fail with invalid amount (<100)", async ({
    page,
  }) => {
    const withdrawal = new WithdrawalPage(page);
    await withdrawal.withdrawAmount({ amount: "0" });

    await expect(
      page.getByRole("button", { name: "ถอนเงิน ฿" }),
    ).toBeDisabled();
    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeHidden();
  });

  test("Verify withdrawal fail with invalid amount (>50000)", async ({
    page,
  }) => {
    await page.getByText("ฝากเงินDeposit").click();

    const deposit = new DepositPage(page);
    await deposit.depositAmount({ amount: "20000" });
    await page.getByRole("button", { name: "กลับ" }).click();

    const withdrawal = new WithdrawalPage(page);
    const amountInput = await withdrawal.withdrawValidationMessage({
      amount: "60000",
    });
    const isInvalid = await amountInput.evaluate((el) => !el.checkValidity());
    expect(isInvalid).toBe(true);
    const validationMessage = await amountInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(validationMessage).not.toBe("");

    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeHidden();
  });

  test("Verify withdrawal fail with excessive remaining balance", async ({
    page,
  }) => {
    const withdrawal = new WithdrawalPage(page);
    await withdrawal.withdrawAmount({ amount: "50001" });

    await expect(
      page.getByRole("button", { name: "ถอนเงิน ฿" }),
    ).toBeDisabled();
    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeHidden();
  });

  test("Verify withdrawal fail with invalid amount (not multiples of 100)", async ({
    page,
  }) => {
    const withdrawal = new WithdrawalPage(page);
    const amountInput = await withdrawal.withdrawValidationMessage({
      amount: "99",
    });
    const isInvalid = await amountInput.evaluate((el) => !el.checkValidity());
    expect(isInvalid).toBe(true);
    const validationMessage = await amountInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(validationMessage).not.toBe("");

    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeHidden();
  });
});
