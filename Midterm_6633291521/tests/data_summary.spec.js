import { test, expect, describe } from "@playwright/test";
import { fillForm } from "../page-objects/inputFieldHelper";
import validFormData from "../test-data/validFormData.json";
import { navigateToForm } from "../page-objects/navigateToForm";
import path from "path";
import message from "../test-data/message.json";

describe("Submission Modal Validation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToForm(page);
  });
  
  test("Verify that the submission modal correctly displays the exact data entered in the form.", async ({ page }) => {
    await fillForm(page, {
      ...validFormData,
      gender: validFormData.gender[1],
      subjects: validFormData.subjects[0],
      picturePath: path.resolve(__dirname, validFormData.picturePath[0]),
    });
    await expect(page.getByText(message.submitSuccess)).toBeVisible();
    const expectedData = {
      "Student Name": `${validFormData.firstName} ${validFormData.lastName}`,
      "Student Email": validFormData.email,
      Gender: validFormData.gender[1],
      Mobile: validFormData.mobileNumber,
      "Date of Birth": `${validFormData.dateOfBirth.day} ${validFormData.monthOfBirth[0]},${validFormData.dateOfBirth.year}`,
      Subjects: validFormData.subjects[0],
      Hobbies: validFormData.hobbies.join(", "),
      Picture: validFormData.picturePath[0].split("/").pop(),
      Address: validFormData.address,
      "State and City": `${validFormData.state} ${validFormData.city}`,
    };
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

  test("Verify Close Modal", async ({ page }) => {
    await fillForm(page, {
      ...validFormData,
      gender: validFormData.gender[1],
      subjects: validFormData.subjects[0],
      picturePath: path.resolve(__dirname, validFormData.picturePath[0]),
    });
    await expect(
      page.getByRole(inputFieldInfo.closeButton.role, {
        name: inputFieldInfo.closeButton.name,
      }),
    ).toBeVisible();
    await page
      .getByRole(inputFieldInfo.closeButton.role, {
        name: inputFieldInfo.closeButton.name,
      })
      .click();
    await expect(
      page.getByRole("dialog", { name: message.submitSuccess }),
    ).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
  });
});
