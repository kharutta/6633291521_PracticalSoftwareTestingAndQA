async function fillInputField(page, role, name, value, format) {
  const input = await page.getByRole(role, { name });
  await input.click();
  if (role !== "radio") {
    await input.fill(value);
  }
}

async function validateInputField(page, role, name, value, errorMessage) {
  await fillInputField(page, role, name, value);
  const error = await page.getByText(errorMessage);
  await expect(error).toBeVisible();
}

async function fillForm(page, formData) {
  const {
    firstName,
    lastName,
    email,
    gender,
    mobileNumber,
    dateOfBirth,
    subjects,
    hobbies,
    picturePath,
    address,
    state,
    city,
  } = formData;

  await fillInputField(page, "textbox", "First Name", firstName, /^[A-Za-z]+$/);
  await fillInputField(page, "textbox", "Last Name", lastName, /^[A-Za-z]+$/);
  await fillInputField(
    page,
    "textbox",
    "name@example.com",
    email,
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  );
  await fillInputField(page, "radio", gender, null);
  await fillInputField(
    page,
    "textbox",
    "Mobile Number",
    mobileNumber,
    /^\d{10}$/,
  );

  await page.locator("#dateOfBirthInput").click();
  await page
    .locator(".react-datepicker__year-select")
    .selectOption(dateOfBirth.year);
  await page
    .locator(".react-datepicker__month-select")
    .selectOption(dateOfBirth.month);
  await page
    .locator(
      `.react-datepicker__day--${dateOfBirth.day.padStart(3, "0")}:not(.react-datepicker__day--outside-month)`,
    )
    .click();

  await page.locator(".subjects-auto-complete__input-container").click();
  await page.locator("#subjectsInput").fill(subjects);
  await page.getByRole("option", { name: subjects }).click();

  for (const hobby of hobbies) {
    await page
      .locator("div")
      .filter({ hasText: new RegExp(`^${hobby}$`) })
      .click();
  }

  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles(picturePath);
  await page.getByRole("textbox", { name: "Current Address" }).fill(address);

  await page.locator("#state").click();
  await page.getByRole("option", { name: state }).click();
  await page.locator("#city").click();
  await page.getByRole("option", { name: city }).click();

  await page.getByRole("button", { name: "Submit" }).click();
}

module.exports = { fillInputField, validateInputField, fillForm };
