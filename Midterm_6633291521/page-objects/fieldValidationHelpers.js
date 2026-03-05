import { fillInputField } from "./inputFieldHelper";
import { navigateToForm } from "./navigateToForm";
import { expect } from "@playwright/test";
import message from "../test-data/message.json";

export async function validateMandatoryField(page, fieldSelector, validInputs) {
  await navigateToForm(page);

  for (const input of validInputs) {
    await fillInputField(page, input.role, input.name, input.value);
  }
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText(message.submitSuccess),
  ).not.toBeVisible();

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
  await navigateToForm(page);
  for (const input of validInputs) {
    await fillInputField(page, input.role, input.name, input.value);
  }
  await page.getByRole("button", { name: "Submit" }).click();
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
