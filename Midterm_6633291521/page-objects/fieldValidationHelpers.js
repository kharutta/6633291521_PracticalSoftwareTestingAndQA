import { fillInputField } from "./inputFieldHelper";
import { expect } from "@playwright/test";
import message from "../test-data/message.json";
import validFormData from "../test-data/validFormData.json";
import { fillForm } from "./inputFieldHelper";
import inputFieldInfo from "../test-data/input_field_info.json";
import path from "path";

export async function validateMandatoryField(page, fieldSelector) {
  await fillForm(page, {
    ...validFormData,
    firstName:
      fieldSelector === inputFieldInfo.firstName.locator
        ? ""
        : validFormData.firstName,
    lastName:
      fieldSelector === inputFieldInfo.lastName.locator
        ? ""
        : validFormData.lastName,
    mobileNumber:
      fieldSelector === inputFieldInfo.mobileNumber.locator
        ? ""
        : validFormData.mobileNumber,
    gender:
      fieldSelector === inputFieldInfo.gender.locator
        ? ""
        : validFormData.gender[1],
    subjects: validFormData.subjects[0],
    picturePath: path.resolve(__dirname, validFormData.picturePath[0]),
  });

  await page
    .getByRole(inputFieldInfo.submitButton.role, {
      name: inputFieldInfo.submitButton.name,
    })
    .click();

  await expect(page.getByText(message.submitSuccess)).not.toBeVisible();

  await expect(page.locator(fieldSelector)).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
  const isInvalid = await page.$eval(
    fieldSelector,
    (el) => !el.checkValidity(),
  );
  expect(isInvalid).toBe(true);
}

export async function validateFormat(page, fieldSelector, validInputs) {
  for (const input of validInputs) {
    await fillInputField(page, input.role, input.name, input.value);
  }
  await page
    .getByRole(inputFieldInfo.submitButton.role, {
      name: inputFieldInfo.submitButton.name,
    })
    .click();
  const isValid = validInputs.every((input) => input.format.test(input.value));
  if (isValid) {
    await expect(page.locator(fieldSelector)).toHaveCSS(
      "border-color",
      "rgb(25, 135, 84)",
    );
    const isInvalid = await page.$eval(
      fieldSelector,
      (el) => !el.checkValidity(),
    );
    expect(isInvalid).toBe(false);
  } else {
    await expect(page.locator(fieldSelector)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
    const isInvalid = await page.$eval(
      fieldSelector,
      (el) => !el.checkValidity(),
    );
    expect(isInvalid).toBe(true);
  }
}
