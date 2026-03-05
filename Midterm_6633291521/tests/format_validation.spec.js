import { test, expect, describe } from "@playwright/test";
import { navigateToForm } from "../page-objects/navigateToForm";
import { validateFormat } from "../page-objects/fieldValidationHelpers";
import invalidFormData from "../test-data/invalidFormData.json";
import validFormData from "../test-data/validFormData.json";
import stateCities from "../test-data/stateCities";
import inputFieldInfo from "../test-data/input_field_info.json";

// #region First Name
describe("First Name Format Validation", () => {
  test("Verify First Name format validation (contain numbers)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.firstName.locator, [
      {
        role: inputFieldInfo.firstName.role,
        name: inputFieldInfo.firstName.name,
        value: invalidFormData.firstName[0],
        format: new RegExp(inputFieldInfo.firstName.format),
      },
    ]);
  });

  test("Verify First Name format validation (contain special characters)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.firstName.locator, [
      {
        role: inputFieldInfo.firstName.role,
        name: inputFieldInfo.firstName.name,
        value: invalidFormData.firstName[1],
        format: new RegExp(inputFieldInfo.firstName.format),
      },
    ]);
  });

  test("Verify First Name format validation (valid First Name)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.firstName.locator, [
      {
        role: inputFieldInfo.firstName.role,
        name: inputFieldInfo.firstName.name,
        value: validFormData.firstName,
        format: new RegExp(inputFieldInfo.firstName.format),
      },
    ]);
  });
});
// #endregion

// #region Last Name

describe("Last Name Format Validation", () => {
  test("Verify Last Name format validation (contain numbers)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.lastName.locator, [
      {
        role: inputFieldInfo.lastName.role,
        name: inputFieldInfo.lastName.name,
        value: invalidFormData.lastName[0],
        format: new RegExp(inputFieldInfo.lastName.format),
      },
    ]);
  });

  test("Verify Last Name format validation (contain special characters)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.lastName.locator, [
      {
        role: inputFieldInfo.lastName.role,
        name: inputFieldInfo.lastName.name,
        value: invalidFormData.lastName[1],
        format: new RegExp(inputFieldInfo.lastName.format),
      },
    ]);
  });

  test("Verify Last Name format validation (valid Last Name)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.lastName.locator, [
      {
        role: inputFieldInfo.lastName.role,
        name: inputFieldInfo.lastName.name,
        value: validFormData.lastName,
        format: new RegExp(inputFieldInfo.lastName.format),
      },
    ]);
  });
});
// #endregion

// #region Mobile Number
describe("Mobile Number Format Validation", () => {
  test("Verify Mobile format validation (less than 10 digits)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.mobileNumber.locator, [
      {
        role: inputFieldInfo.mobileNumber.role,
        name: inputFieldInfo.mobileNumber.name,
        value: invalidFormData.mobileNumber[0],
        format: new RegExp(inputFieldInfo.mobileNumber.format),
      },
    ]);
  });

  test("Verify Mobile format validation (contains letters)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.mobileNumber.locator, [
      {
        role: inputFieldInfo.mobileNumber.role,
        name: inputFieldInfo.mobileNumber.name,
        value: invalidFormData.mobileNumber[1],
        format: new RegExp(inputFieldInfo.mobileNumber.format),
      },
    ]);
  });

  test("Verify Mobile format validation (valid mobile number)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.mobileNumber.locator, [
      {
        role: inputFieldInfo.mobileNumber.role,
        name: inputFieldInfo.mobileNumber.name,
        value: validFormData.mobileNumber,
        format: new RegExp(inputFieldInfo.mobileNumber.format),
      },
    ]);
  });
});
// #endregion

// #region Email
describe("Email Format Validation", () => {
  test("Verify Email format validation (missing @)", async ({ page }) => {
    await validateFormat(page, inputFieldInfo.email.locator, [
      {
        role: inputFieldInfo.email.role,
        name: inputFieldInfo.email.name,
        value: invalidFormData.email[0],
        format: new RegExp(inputFieldInfo.email.format),
      },
    ]);
  });

  test("Verify Email format validation (missing domain)", async ({ page }) => {
    await validateFormat(page, inputFieldInfo.email.locator, [
      {
        role: inputFieldInfo.email.role,
        name: inputFieldInfo.email.name,
        value: invalidFormData.email[1],
        format: new RegExp(inputFieldInfo.email.format),
      },
    ]);
  });

  test("Verify Email format validation (valid email)", async ({ page }) => {
    await validateFormat(page, inputFieldInfo.email.locator, [
      {
        role: inputFieldInfo.email.role,
        name: inputFieldInfo.email.name,
        value: validFormData.email,
        format: new RegExp(inputFieldInfo.email.format),
      },
    ]);
  });
});
// #endregion

// #region Date of Birth
describe("Date of Birth Format Validation", () => {
  test("Verify Date of Birth format validation (default date)", async ({
    page,
  }) => {
    await navigateToForm(page);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")} ${currentDate.toLocaleString("default", { month: "short" })} ${currentDate.getFullYear()}`;
    const displayedDate = await page
      .locator(inputFieldInfo.dateOfBirthInput?.locator || "#dateOfBirthInput")
      .inputValue();
    expect(displayedDate).toBe(formattedDate);
  });

  test("Verify Date of Birth format validation (manual date selection)", async ({
    page,
  }) => {
    await navigateToForm(page);
    await page
      .locator(inputFieldInfo.dateOfBirthInput?.locator || "#dateOfBirthInput")
      .click();
    await page
      .locator(inputFieldInfo.dateOfBirth.month.locator)
      .selectOption(validFormData.dateOfBirth.month);
    await page
      .locator(inputFieldInfo.dateOfBirth.year.locator)
      .selectOption(validFormData.dateOfBirth.year);
    await page
      .locator(
        `${inputFieldInfo.dateOfBirth.day.locator}${validFormData.dateOfBirth.day}`,
      )
      .click();
    const newDate = await page
      .locator(inputFieldInfo.dateOfBirthInput?.locator || "#dateOfBirthInput")
      .inputValue();
    expect(newDate).toBe(
      `${validFormData.dateOfBirth.day} ${validFormData.monthOfBirth[1]} ${validFormData.dateOfBirth.year}`,
    );
    expect(newDate).toMatch(new RegExp(inputFieldInfo.dateOfBirth.format));
  });
});
// #endregion

// #region Picture

describe("Picture Format Validation", () => {
  const { uploadFileToForm } = require("../page-objects/uploadFileHelper");

  test("Verify Picture file upload (jpg)", async ({ page }) => {
    const fileName = await uploadFileToForm(page, validFormData.picturePath[1]);
    expect(fileName).toContain(validFormData.picturePath[1].split("/").pop());
  });

  test("Verify Picture file upload (png)", async ({ page }) => {
    const fileName = await uploadFileToForm(page, validFormData.picturePath[0]);
    expect(fileName).toContain(validFormData.picturePath[0].split("/").pop());
  });

  test("Verify Picture file upload (pdf)", async ({ page }) => {
    const fileName = await uploadFileToForm(page, invalidFormData.picturePath);
    expect(fileName).not.toContain(
      invalidFormData.picturePath.split("/").pop(),
    );
  });
});
// #endregion

// #region Current Address

describe("Current Address Format Validation", () => {
  test("Verify Current Address format validation (valid address)", async ({
    page,
  }) => {
    await validateFormat(page, inputFieldInfo.address.locator, [
      {
        role: inputFieldInfo.address.role,
        name: inputFieldInfo.address.name,
        value: validFormData.address,
        format: new RegExp(inputFieldInfo.address.format),
      },
    ]);
  });

  test("Verify Current Address format validation (multi-line)", async ({
    page,
  }) => {
    await navigateToForm(page);
    const addressInput = page.getByRole(inputFieldInfo.address.role, {
      name: inputFieldInfo.address.name,
    });
    const multiLine = validFormData.address;
    await addressInput.fill(multiLine);
    const value = await addressInput.inputValue();
    expect(value).toBe(multiLine);
    expect(value).toMatch(new RegExp(inputFieldInfo.address.format));
  });
});
// #endregion

// #region City & State
describe("City Dropdown Validation", () => {
  test('Verify that the City dropdown must remain disabled or empty until a State is selected.', async ({
    page,
  }) => {
    await navigateToForm(page);
    await page.addStyleTag({ content: `footer { display: none !important; }` });
    const cityDropdown = page.locator(inputFieldInfo.city.locator);
    await cityDropdown.click({ force: true });
    await expect(page.locator('[id^="react-select-4-option"]')).toHaveCount(0);
  });

  test('Verify that the City dropdown options change based on the selected State.', async ({
    page,
  }) => {
    await navigateToForm(page);
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
  test('Verify that the Subjects field allows multiple entries and displays them as removable tags.', async ({
    page,
  }) => {
    await navigateToForm(page);
    const subjectInput = page.locator(inputFieldInfo.subjects.locator);
    await subjectInput.fill(validFormData.subjects[0]);
    await page.getByRole("option", { name: validFormData.subjects[0] }).click();
    await subjectInput.fill(validFormData.subjects[1]);
    await page.getByRole("option", { name: validFormData.subjects[1] }).click();
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
  test("Verify Gender radio button options and single selection", async ({
    page,
  }) => {
    await navigateToForm(page);
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
  test('Verify that the Hobbies checkboxes allow multi-selection', async ({
    page,
  }) => {
    await navigateToForm(page);

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
