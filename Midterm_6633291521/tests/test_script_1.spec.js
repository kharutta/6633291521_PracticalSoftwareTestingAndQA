import { test, expect } from "@playwright/test";
import { fillForm } from "../page-objects/inputFieldHelper";
import validFormData from "../test-data/validFormData.json";

test("Verify that a user can successfully submit the form with all valid data.", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await fillForm(page, validFormData);

  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();
});
