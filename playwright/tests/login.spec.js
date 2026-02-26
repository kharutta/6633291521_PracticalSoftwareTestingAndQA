import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import validUser from "../test-data/users/valid-user.json";
import invalidUser from "../test-data/users/invalid-user.json";

test("Verify login pass with valid user ", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(validUser[0]);
  await expect(
    page.getByText("เข้าสู่ระบบสำเร็จ", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "ยอดเงินคงเหลือ" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "ธุรกรรมล่าสุด" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "ออกจากระบบ" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "เข้าสู่ระบบ" })).toBeHidden();
});

test("Verify login fail with invalid username", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(invalidUser[0]);
  await expect(
    page.getByText("กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN", { exact: true }),
  ).toBeVisible();
});

test("Verify login fail with invalid password", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(invalidUser[1]);
  await expect(
    page.getByText("กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN", { exact: true }),
  ).toBeVisible();
});
