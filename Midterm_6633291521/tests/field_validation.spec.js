import { test, expect, describe } from "@playwright/test";
import { fillForm } from "../page-objects/inputFieldHelper";
import validFormData from "../test-data/validFormData.json";
import message from "../test-data/message.json";
import { navigateToForm } from "../page-objects/navigateToForm";
import { validateMandatoryField } from "../page-objects/fieldValidationHelpers";
import path from "path";
import inputFieldInfo from "../test-data/input_field_info.json";
import stateCities from "../test-data/stateCities";

// #region Mandatory Fields
describe("Fields Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

  test("Verify that a user can successfully submit the form with all valid data.", async ({
    page,
  }) => {
    await fillForm(page, {
      ...validFormData,
      gender: validFormData.gender[1],
      subjects: validFormData.subjects[0],
      picturePath: path.resolve(__dirname, validFormData.picturePath[0]),
    });

    await expect(page.getByText(message.submitSuccess)).toBeVisible();
  });

  test("Verify that the form cannot be submitted if mandatory fields (First Name) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, inputFieldInfo.firstName.locator);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Last Name) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, inputFieldInfo.lastName.locator);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Gender) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, inputFieldInfo.gender.locator);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Mobile) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, inputFieldInfo.mobileNumber.locator);
  });
});
// #endregion

// #region City & State
describe("City Dropdown Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

  test("Verify that the City dropdown must remain disabled or empty until a State is selected.", async ({
    page,
  }) => {
    const cityDropdown = page.locator(inputFieldInfo.city.locator);
    await cityDropdown.click({ force: true });
    await expect(page.locator('[id^="react-select-4-option"]')).toHaveCount(0);
  });

  test("Verify that the City dropdown options change based on the selected State.", async ({
    page,
  }) => {
    for (const [state, cities] of Object.entries(stateCities)) {
      await page.locator(inputFieldInfo.state.locator).click();
      await page
        .getByRole(inputFieldInfo.state.role, { name: state, exact: true })
        .click();
      await page.locator(inputFieldInfo.city.locator).click();
      const cityOptions = await page
        .locator(`${inputFieldInfo.city.locator} [id^="react-select-4-option"]`)
        .allTextContents();
      expect(cityOptions).toStrictEqual(cities);
    }
  });
});
// #endregion

// #region Subjects
describe("Subjects Field Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

  test("Verify that the Subjects field allows multiple entries and displays them as removable tags.", async ({
    page,
  }) => {
    const subjectInput = page.locator(inputFieldInfo.subjects.locator);
    await subjectInput.fill(validFormData.subjects[0]);
    await page
      .getByRole(inputFieldInfo.subjects.role, {
        name: validFormData.subjects[0],
      })
      .click();
    await subjectInput.fill(validFormData.subjects[1]);
    await page
      .getByRole(inputFieldInfo.subjects.role, {
        name: validFormData.subjects[1],
      })
      .click();
    const tags = page.locator(".subjects-auto-complete__multi-value__label");
    await expect(tags).toHaveCount(2);
    await expect(tags).toHaveText([
      validFormData.subjects[0],
      validFormData.subjects[1],
    ]);
    await page
      .locator(".subjects-auto-complete__multi-value", {
        hasText: validFormData.subjects[0],
      })
      .locator(".subjects-auto-complete__multi-value__remove")
      .click();
    await expect(tags).toHaveCount(1);
    await expect(tags).toHaveText([validFormData.subjects[1]]);
  });
});
// #endregion

// #region Gender
describe("Gender Radio Button Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

  test("Verify Gender radio button options and single selection", async ({
    page,
  }) => {
    const genderOptions = validFormData.gender;
    for (const gender of genderOptions) {
      await expect(page.getByLabel(gender, { exact: true })).toBeVisible();
    }
    for (const gender of genderOptions) {
      await page.getByLabel(gender, { exact: true }).check();
      for (const checkGender of genderOptions) {
        const radio = page.getByLabel(checkGender, { exact: true });
        if (checkGender === gender) {
          await expect(radio).toBeChecked();
        } else {
          await expect(radio).not.toBeChecked();
        }
      }
    }
  });
});
// #endregion

// #region Hobbies
describe("Hobbies Checkbox Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

  test("Verify that the Hobbies checkboxes allow multi-selection", async ({
    page,
  }) => {
    const hobbies = validFormData.hobbies;

    for (const hobby of hobbies) {
      await page.getByLabel(hobby, { exact: true }).check();
    }

    for (const hobby of hobbies) {
      await expect(page.getByLabel(hobby, { exact: true })).toBeChecked();
    }

    await page.getByLabel(hobbies[0], { exact: true }).uncheck();

    await expect(page.getByLabel(hobbies[0])).not.toBeChecked();
    await expect(page.getByLabel(hobbies[1])).toBeChecked();
    await expect(page.getByLabel(hobbies[2])).toBeChecked();
  });
});
// #endregion
