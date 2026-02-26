import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import validUser from "../test-data/users/valid-user.json";

test.describe("Test history", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(validUser[0]);
  });

  test("Verify transaction history component", async ({ page }) => {
    await expect(page.getByText("ประวัติHistory")).toBeVisible();
    await page.getByText("ประวัติHistory").click();
    await expect(
      page.getByRole("heading", { name: "ประวัติการทำธุรกรรม" }),
    ).toBeVisible();
    await expect(page.getByText("ยอดฝากรวม")).toBeVisible();
    await expect(page.getByText("ยอดถอนรวม")).toBeVisible();
    await expect(page.getByText("ยอดโอนรวม")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "กรองรายการ" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /ทั้งหมด/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /ฝากเงิน/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /ถอนเงิน/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /โอนเงิน/ })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "รายการธุรกรรม" }),
    ).toBeVisible();
  });

  test("Verify transaction filter (All)", async ({ page }) => {
    await page.getByText("ประวัติHistory").click();
    await page.getByRole("button", { name: /ทั้งหมด/ }).click();
    await expect(page.getByText("ฝากเงินสด")).toBeVisible();
    await expect(page.getByText("ถอนเงินสด")).toBeVisible();
    await expect(page.getByText("โอนเงินไปยัง")).toBeVisible();
  });

  test("Verify transaction filter (Deposit)", async ({ page }) => {
    await page.getByText("ประวัติHistory").click();
    await page.getByRole("button", { name: /ฝากเงิน/ }).click();
    await expect(page.getByText("ฝากเงินสด")).toBeVisible();
    await expect(page.getByText("ถอนเงินสด")).toBeHidden();
    await expect(page.getByText("โอนเงินไปยัง")).toBeHidden();
  });

  test("Verify transaction filter (Withdrawal)", async ({ page }) => {
    await page.getByText("ประวัติHistory").click();
    await page.getByRole("button", { name: /ถอนเงิน/ }).click();
    await expect(page.getByText("ฝากเงินสด")).toBeHidden();
    await expect(page.getByText("ถอนเงินสด")).toBeVisible();
    await expect(page.getByText("โอนเงินไปยัง")).toBeHidden();
  });

  test("Verify transaction filter (Transfer)", async ({ page }) => {
    await page.getByText("ประวัติHistory").click();
    await page.getByRole("button", { name: /โอนเงิน/ }).click();
    await expect(page.getByText("ฝากเงินสด")).toBeHidden();
    await expect(page.getByText("ถอนเงินสด")).toBeHidden();
    await expect(page.getByText("โอนเงินไปยัง")).toBeVisible();
  });
});
