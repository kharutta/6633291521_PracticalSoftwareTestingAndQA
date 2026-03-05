import { test, expect, describe } from "@playwright/test";
import { navigateToForm } from "../page-objects/navigateToForm";
import { validateFormat } from "../page-objects/fieldValidationHelpers";
import invalidFormData from "../test-data/invalidFormData.json";
import validFormData from "../test-data/validFormData.json";
import stateCities from "../test-data/stateCities";

describe("First Name Format Validation", () => {
  test("Verify First Name format validation (contain numbers)", async ({
    page,
  }) => {
    await validateFormat(page, "#firstName", [
      {
        role: "textbox",
        name: "First Name",
        value: invalidFormData.firstName[0],
        format: /^[A-Za-z]+$/,
      },
    ]);
  });

  test("Verify First Name format validation (contain special characters)", async ({
    page,
  }) => {
    await validateFormat(page, "#firstName", [
      {
        role: "textbox",
        name: "First Name",
        value: invalidFormData.firstName[1],
        format: /^[A-Za-z]+$/,
      },
    ]);
  });

  test("Verify First Name format validation (valid First Name)", async ({
    page,
  }) => {
    await validateFormat(page, "#firstName", [
      {
        role: "textbox",
        name: "First Name",
        value: validFormData.firstName,
        format: /^[A-Za-z]+$/,
      },
    ]);
  });
});

describe("First Name Format Validation", () => {
  test("Verify Last Name format validation (contain numbers)", async ({
    page,
  }) => {
    await validateFormat(page, "#lastName", [
      {
        role: "textbox",
        name: "Last Name",
        value: invalidFormData.lastName[0],
        format: /^[A-Za-z]+$/,
      },
    ]);
  });

  test("Verify Last Name format validation (contain special characters)", async ({
    page,
  }) => {
    await validateFormat(page, "#lastName", [
      {
        role: "textbox",
        name: "Last Name",
        value: invalidFormData.lastName[1],
        format: /^[A-Za-z]+$/,
      },
    ]);
  });

  test("Verify Last Name format validation (valid Last Name)", async ({
    page,
  }) => {
    await validateFormat(page, "#lastName", [
      {
        role: "textbox",
        name: "Last Name",
        value: validFormData.lastName,
        format: /^[A-Za-z]+$/,
      },
    ]);
  });
});

describe("Mobile Number Format Validation", () => {
  test("Verify Mobile format validation (less than 10 digits)", async ({
    page,
  }) => {
    await validateFormat(page, "#userNumber", [
      {
        role: "textbox",
        name: "Mobile Number",
        value: invalidFormData.mobileNumber[0],
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify Mobile format validation (contains letters)", async ({
    page,
  }) => {
    await validateFormat(page, "#userNumber", [
      {
        role: "textbox",
        name: "Mobile Number",
        value: invalidFormData.mobileNumber[1],
        format: /^\d{10}$/,
      },
    ]);
  });

  test("Verify Mobile format validation (valid mobile number)", async ({
    page,
  }) => {
    await validateFormat(page, "#userNumber", [
      {
        role: "textbox",
        name: "Mobile Number",
        value: validFormData.mobileNumber,
        format: /^\d{10}$/,
      },
    ]);
  });
});

describe("Email Format Validation", () => {
  test("Verify Email format validation (missing @)", async ({ page }) => {
    await validateFormat(page, "#userEmail", [
      {
        role: "textbox",
        name: "name@example.com",
        value: invalidFormData.email[0],
        format: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    ]);
  });

  test("Verify Email format validation (missing domain)", async ({ page }) => {
    await validateFormat(page, "#userEmail", [
      {
        role: "textbox",
        name: "name@example.com",
        value: invalidFormData.email[1],
        format: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    ]);
  });

  test("Verify Email format validation (valid email)", async ({ page }) => {
    await validateFormat(page, "#userEmail", [
      {
        role: "textbox",
        name: "name@example.com",
        value: validFormData.email,
        format: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    ]);
  });
});

describe("Date of Birth Format Validation", () => {
  test("Verify Date of Birth format validation (default date)", async ({
    page,
  }) => {
    await navigateToForm(page);

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

  test("Verify Date of Birth format validation (manual date selection)", async ({
    page,
  }) => {
    await navigateToForm(page);

    await page.locator("#dateOfBirthInput").click();
    await page
      .locator(".react-datepicker__month-select")
      .selectOption(validFormData.dateOfBirth.month);
    await page
      .locator(".react-datepicker__year-select")
      .selectOption(validFormData.dateOfBirth.year);
    await page
      .locator(`.react-datepicker__day--0${validFormData.dateOfBirth.day}`)
      .click();

    const newDate = await page.locator("#dateOfBirthInput").inputValue();
    expect(newDate).toBe(
      `${validFormData.dateOfBirth.day} ${validFormData.monthOfBirth[1]} ${validFormData.dateOfBirth.year}`,
    );
    expect(newDate).toMatch(/^\d{2} [A-Za-z]{3} \d{4}$/);
  });
});

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
    expect(fileName).not.toContain(invalidFormData.picturePath.split("/").pop());
  });
});

describe("Current Address Format Validation", () => {
  test("Verify Current Address format validation (valid address)", async ({
    page,
  }) => {
    await validateFormat(page, "#currentAddress", [
      {
        role: "textbox",
        name: "Current Address",
        value: validFormData.address,
        format: /^[A-Za-z0-9 \n]+$/,
      },
    ]);
  });

  test("Verify Current Address format validation (multi-line)", async ({
    page,
  }) => {
    await navigateToForm(page);
    const addressInput = page.getByRole("textbox", {
      name: "Current Address",
    });
    const multiLine = validFormData.address;
    await addressInput.fill(multiLine);
    const value = await addressInput.inputValue();
    expect(value).toBe(multiLine);
    expect(value).toMatch(/^[A-Za-z0-9 \n]+$/);
  });
});

describe("City Dropdown Validation", () => {
  test('Verify that the "City" dropdown must remain disabled or empty until a "State" is selected.', async ({
    page,
  }) => {
    await navigateToForm(page);

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
    await navigateToForm(page);

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

describe("Subjects Field Validation", () => {
  test('Verify that the "Subjects" field allows multiple entries and displays them as removable tags.', async ({
    page,
  }) => {
    await navigateToForm(page);

    const subjectInput = page.locator("#subjectsInput");

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
