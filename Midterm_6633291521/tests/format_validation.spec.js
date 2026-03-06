import { test, expect, describe } from "@playwright/test";
import { navigateToForm } from "../page-objects/navigateToForm";
import { validateFormat } from "../page-objects/fieldValidationHelpers";
import invalidFormData from "../test-data/invalidFormData.json";
import validFormData from "../test-data/validFormData.json";
import inputFieldInfo from "../test-data/input_field_info.json";

// #region First Name
describe("First Name Format Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

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
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

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
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

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
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

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
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

  test("Verify Date of Birth format validation (default date)", async ({
    page,
  }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")} ${currentDate.toLocaleString("default", { month: "short" })} ${currentDate.getFullYear()}`;
    const displayedDate = await page
      .locator(inputFieldInfo.dateOfBirth.locator)
      .inputValue();
    expect(displayedDate).toBe(formattedDate);
  });

  test("Verify Date of Birth format validation (manual date selection)", async ({
    page,
  }) => {
    await page.locator(inputFieldInfo.dateOfBirth.locator).click();
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
      .locator(inputFieldInfo.dateOfBirth.locator)
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

  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

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
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });

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