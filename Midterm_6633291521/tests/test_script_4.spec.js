import { test, expect, describe } from "@playwright/test";
import { fillInputField } from "../page-objects/inputFieldHelper";

test('Verify that the "Subjects" field allows multiple entries and displays them as removable tags.', async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  const subjectInput = page.locator("#subjectsInput");

  await subjectInput.fill("Maths");
  await page.getByRole("option", { name: "Maths" }).click();

  await subjectInput.fill("Physics");
  await page.getByRole("option", { name: "Physics" }).click();

  // both tags exist
  const tags = page.locator(".subjects-auto-complete__multi-value__label");

  await expect(tags).toHaveCount(2);
  await expect(tags).toHaveText(["Maths", "Physics"]);

  // remove Maths
  await page
    .locator(".subjects-auto-complete__multi-value", { hasText: "Maths" })
    .locator(".subjects-auto-complete__multi-value__remove")
    .click();

  // only Physics remains
  await expect(tags).toHaveCount(1);
  await expect(tags).toHaveText(["Physics"]);
});
