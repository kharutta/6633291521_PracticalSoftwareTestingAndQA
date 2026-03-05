import { test, expect, describe } from "@playwright/test";
import { fillForm } from "../page-objects/inputFieldHelper";
import validFormData from "../test-data/validFormData.json";
import message from "../test-data/message.json";
import { navigateToForm } from "../page-objects/navigateToForm";
import { validateMandatoryField } from "../page-objects/fieldValidationHelpers";
import path from "path";
import inputFieldInfo from "../test-data/input_field_info.json";

describe("Fields Validation", () => {
  test("Verify that a user can successfully submit the form with all valid data.", async ({
    page,
  }) => {
    await navigateToForm(page);

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
    await validateMandatoryField(page, inputFieldInfo.firstName.locator, [
      {
        role: inputFieldInfo.lastName.role,
        name: inputFieldInfo.lastName.name,
        value: validFormData.lastName,
      },
      { role: "radio", name: validFormData.gender[1], value: null },
      {
        role: inputFieldInfo.mobileNumber.role,
        name: inputFieldInfo.mobileNumber.name,
        value: validFormData.mobileNumber,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Last Name) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, inputFieldInfo.lastName.locator, [
      {
        role: inputFieldInfo.firstName.role,
        name: inputFieldInfo.firstName.name,
        value: validFormData.firstName,
      },
      { role: "radio", name: validFormData.gender[1], value: null },
      {
        role: inputFieldInfo.mobileNumber.role,
        name: inputFieldInfo.mobileNumber.name,
        value: validFormData.mobileNumber,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Gender) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, "#gender-radio-1", [
      {
        role: inputFieldInfo.firstName.role,
        name: inputFieldInfo.firstName.name,
        value: validFormData.firstName,
      },
      {
        role: inputFieldInfo.lastName.role,
        name: inputFieldInfo.lastName.name,
        value: validFormData.lastName,
      },
      {
        role: inputFieldInfo.mobileNumber.role,
        name: inputFieldInfo.mobileNumber.name,
        value: validFormData.mobileNumber,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Mobile) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, inputFieldInfo.mobileNumber.locator, [
      {
        role: inputFieldInfo.firstName.role,
        name: inputFieldInfo.firstName.name,
        value: validFormData.firstName,
      },
      {
        role: inputFieldInfo.lastName.role,
        name: inputFieldInfo.lastName.name,
        value: validFormData.lastName,
      },
      { role: "radio", name: validFormData.gender[1], value: null },
    ]);
  });
});
