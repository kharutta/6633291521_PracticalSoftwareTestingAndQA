import { test, expect, describe } from "@playwright/test";
import { fillForm } from "../page-objects/inputFieldHelper";
import validFormData from "../test-data/validFormData.json";
import message from "../test-data/message.json";
import { navigateToForm } from "../page-objects/navigateToForm";
import { validateMandatoryField } from "../page-objects/fieldValidationHelpers";
import path from "path";

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

    await expect(
      page.getByText(message.submitSuccess),
    ).toBeVisible();
  });

  test("Verify that the form cannot be submitted if mandatory fields (First Name) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, "#firstName", [
      {
        role: "textbox",
        name: "Last Name",
        value: validFormData.lastName,
      },
      { role: "radio", name: validFormData.gender[1], value: null },
      {
        role: "textbox",
        name: "Mobile Number",
        value: validFormData.mobileNumber,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Last Name) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, "#lastName", [
      {
        role: "textbox",
        name: "First Name",
        value: validFormData.firstName,
      },
      { role: "radio", name: validFormData.gender[1], value: null },
      {
        role: "textbox",
        name: "Mobile Number",
        value: validFormData.mobileNumber,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Gender) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, "#gender-radio-1", [
      {
        role: "textbox",
        name: "First Name",
        value: validFormData.firstName,
      },
      {
        role: "textbox",
        name: "Last Name",
        value: validFormData.lastName,
      },
      {
        role: "textbox",
        name: "Mobile Number",
        value: validFormData.mobileNumber,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Mobile) are blank.", async ({
    page,
  }) => {
    await validateMandatoryField(page, "#userNumber", [
      {
        role: "textbox",
        name: "First Name",
        value: validFormData.firstName,
      },
      {
        role: "textbox",
        name: "Last Name",
        value: validFormData.lastName,
      },
      { role: "radio", name: validFormData.gender[1], value: null },
    ]);
  });
});
