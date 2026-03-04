import { test, expect, describe } from "@playwright/test";
import { fillInputField } from "../page-objects/inputFieldHelper";
import stateCities from "../test-data/stateCities.json";

describe("City Dropdown Validation", () => {
  test('Verify that the "City" dropdown must remain disabled or empty until a "State" is selected.', async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.addStyleTag({
      content: `footer { display: none !important; }`,
    });

    const cityDropdown = page.locator("#city");

    await cityDropdown.click({ force: true });
    await expect(page.locator('[id^="react-select-4-option"]')).toHaveCount(0);
  });

  test('Verify that the "City" dropdown options change based on the selected "State".', async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    for (const [state, cities] of Object.entries(stateCities)) {
      await page.locator("#state").click();
      await page.getByRole("option", { name: state, exact: true }).click();

      await page.locator("#city").click();
      const cityOptions = await page
        .locator('#city [id^="react-select-4-option"]')
        .allTextContents();

      expect(cityOptions).toStrictEqual(cities);
    }
  });
});
