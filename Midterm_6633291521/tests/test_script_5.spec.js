import { test, expect } from "@playwright/test";
import { fillForm } from "../page-objects/inputFieldHelper";
import validFormData from "../test-data/validFormData.json";

test("Verify that the submission modal correctly displays the exact data entered in the form.", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  await fillForm(page, validFormData);

  // Verify the modal displays the correct data
  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();

  // Expected table data
  const expectedData = {
    "Student Name": `${validFormData.firstName} ${validFormData.lastName}`,
    "Student Email": validFormData.email,
    Gender: validFormData.gender,
    Mobile: validFormData.mobileNumber,
    "Date of Birth": `${validFormData.dateOfBirth.day} February,${validFormData.dateOfBirth.year}`,
    Subjects: validFormData.subjects,
    Hobbies: validFormData.hobbies.join(", "),
    Picture: validFormData.picturePath.split("/").pop(),
    Address: validFormData.address,
    "State and City": `${validFormData.state} ${validFormData.city}`,
  };

  // Get all rows from modal table
  const rows = page.locator(".table tbody tr");
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const label = await rows.nth(i).locator("td").nth(0).textContent();
    const value = await rows.nth(i).locator("td").nth(1).textContent();

    const trimmedLabel = label?.trim();
    const trimmedValue = value?.trim();

    expect(trimmedValue).toBe(expectedData[trimmedLabel]);
  }
});
