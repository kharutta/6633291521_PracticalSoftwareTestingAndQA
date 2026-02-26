import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { DepositPage } from "../page-objects/depositPage";
import validUser from "../test-data/users/valid-user.json";

test.describe("Test deposit", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(validUser[0]);
  });

  test("Verify deposit component", async ({ page }) => {
    await expect(page.getByText("ฝากเงินDeposit")).toBeVisible();
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await expect(page.getByRole("button", { name: "กลับ" })).toBeVisible();
    await expect(page.getByText("ยอดเงินคงเหลือปัจจุบัน")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "กรอกจำนวนเงินที่ต้องการฝาก" }),
    ).toBeVisible();
    await expect(page.getByText("จำนวนเงินด่วน")).toBeVisible();
    await expect(page.getByText("หรือกรอกจำนวนเงินเอง")).toBeVisible();
    await expect(page.getByRole("heading", { name: "คำแนะนำ:" })).toBeVisible();
  });

  test("Verify deposit pass with valid amount", async ({ page }) => {
    const deposit = new DepositPage(page);
    await deposit.depositAmount({ amount: "100000" });

    await expect(page.getByText("ยอดเงินใหม่:")).toBeVisible();
    await expect(page.getByRole("button", { name: "ฝากเงิน ฿" })).toBeVisible();
    await page.getByRole("button", { name: "ฝากเงิน ฿" }).click();
    await expect(
      page.getByText("ฝากเงินสำเร็จ", { exact: true }),
    ).toBeVisible();
  });

  test("Verify deposit fail with invalid amount (<1)", async ({ page }) => {
    const deposit = new DepositPage(page);
    await deposit.depositAmount({ amount: "0" });

    await expect(
      page.getByRole("button", { name: "ฝากเงิน ฿" }),
    ).toBeDisabled();
  });

  test("Verify deposit fail with invalid amount (>100000)", async ({
    page,
  }) => {
    const deposit = new DepositPage(page);
    await deposit.depositAmount({ amount: "100001" });
    const amountInput = await deposit.depositValidationMessage({
      amount: "100001",
    });
    const isInvalid = await amountInput.evaluate((el) => !el.checkValidity());
    expect(isInvalid).toBe(true);
    const validationMessage = await amountInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(validationMessage).not.toBe("");
  });
});
