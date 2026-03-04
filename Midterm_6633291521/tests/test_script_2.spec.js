import { test, expect, describe } from "@playwright/test";
import { fillInputField } from "../page-objects/inputFieldHelper";

async function validateField(page, fieldSelector, validInputs) {
  await page.goto("https://demoqa.com/automation-practice-form");

  // Fill valid inputs for other fields
  for (const input of validInputs) {
    await fillInputField(
      page,
      input.role,
      input.name,
      input.value,
      input.format,
    );
  }

  // Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  // Modal should NOT appear
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();

  // Validate the specific field
  await expect(page.locator(fieldSelector)).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
  const isInvalid = await page.$eval(fieldSelector, (el) => !el.checkValidity());
  expect(isInvalid).toBe(true);
}

describe("Mandatory Fields Validation", () => {
  test("Verify that the form cannot be submitted if mandatory fields (First Name) are blank.", async ({
    page,
  }) => {
    await validateField(page, "#firstName", [
      {
        role: "textbox",
        name: "Last Name",
        value: "RuttanaOpha",
        format: /^[A-Za-z]+$/,
      },
      { role: "radio", name: "Female", value: null },
      {
        role: "textbox",
        name: "Mobile Number",
        value: "0812345678",
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Last Name) are blank.", async ({
    page,
  }) => {
    await validateField(page, "#lastName", [
      {
        role: "textbox",
        name: "First Name",
        value: "Ingkharut",
        format: /^[A-Za-z]+$/,
      },
      { role: "radio", name: "Female", value: null },
      {
        role: "textbox",
        name: "Mobile Number",
        value: "0812345678",
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Gender) are blank.", async ({
    page,
  }) => {
    await validateField(page, "#gender-radio-1", [
      {
        role: "textbox",
        name: "First Name",
        value: "Ingkharut",
        format: /^[A-Za-z]+$/,
      },
      {
        role: "textbox",
        name: "Last Name",
        value: "RuttanaOpha",
        format: /^[A-Za-z]+$/,
      },
      {
        role: "textbox",
        name: "Mobile Number",
        value: "0812345678",
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify that the form cannot be submitted if mandatory fields (Mobile) are blank.", async ({
    page,
  }) => {
    await validateField(page, "#userNumber", [
      {
        role: "textbox",
        name: "First Name",
        value: "Ingkharut",
        format: /^[A-Za-z]+$/,
      },
      {
        role: "textbox",
        name: "Last Name",
        value: "RuttanaOpha",
        format: /^[A-Za-z]+$/,
      },
      { role: "radio", name: "Female", value: null },
    ]);
  });
});
