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

  // Modal should appear only if the input is valid
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
    // Validate the specific field
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

describe("Field Validation", () => {
  test("Verify Mobile format validation (less than 10 digits)", async ({
    page,
  }) => {
    await validateField(page, "#userNumber", [
      {
        role: "textbox",
        name: "Mobile Number",
        value: "12345",
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify Mobile format validation (contains letters)", async ({
    page,
  }) => {
    await validateField(page, "#userNumber", [
      {
        role: "textbox",
        name: "Mobile Number",
        value: "081234abcd",
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify Mobile format validation (valid mobile number)", async ({
    page,
  }) => {
    await validateField(page, "#userNumber", [
      {
        role: "textbox",
        name: "Mobile Number",
        value: "0812345678",
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify Email format validation (missing @)", async ({ page }) => {
    await validateField(page, "#userEmail", [
      {
        role: "textbox",
        name: "name@example.com",
        value: "6633291521.student.chula.ac.th",
        format: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    ]);
  });

  test("Verify Email format validation (missing domain)", async ({ page }) => {
    await validateField(page, "#userEmail", [
      {
        role: "textbox",
        name: "name@example.com",
        value: "6633291521@",
        format: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    ]);
  });

  test("Verify Email format validation (valid email)", async ({ page }) => {
    await validateField(page, "#userEmail", [
      {
        role: "textbox",
        name: "name@example.com",
        value: "6633291521@student.chula.ac.th",
        format: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    ]);
  });

  test("Verify Date of Birth format validation (default date)", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${currentDate.toLocaleString("default", {
      month: "short",
    })} ${currentDate.getFullYear()}`;
    const displayedDate = await page.locator("#dateOfBirthInput").inputValue();
    expect(displayedDate).toBe(formattedDate);
  });

  test("Verify Date of Birth format validation (manual date selection)", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__month-select").selectOption("1");
    await page.locator(".react-datepicker__year-select").selectOption("2004");
    await page.locator(".react-datepicker__day--021").click();

    const newDate = await page.locator("#dateOfBirthInput").inputValue();
    expect(newDate).toBe("21 Feb 2004");
  });
});
