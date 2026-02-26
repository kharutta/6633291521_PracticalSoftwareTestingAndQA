import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import validUser from "../test-data/users/valid-user.json";

test("Verify logout functionality", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(validUser[0]);
  await page.getByRole("button", { name: "ออกจากระบบ" }).click();
  await expect(
    page.getByRole("heading", { name: "เข้าสู่ระบบ" }),
  ).toBeVisible();
});
