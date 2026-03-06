import inputFieldInfo from "../test-data/input_field_info.json";

export async function fillInputField(page, role, name, value) {
  if (role === "radio") {
    if (name && name.trim()) {
      const input = await page.getByRole(role, { name });
      await input.click();
    }
  } else {
    const input = await page.getByRole(role, { name });
    await input.click();
    await input.fill(value);
  }
}

export async function fillForm(page, formData) {
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

  await fillInputField(
    page,
    inputFieldInfo.firstName.role,
    inputFieldInfo.firstName.name,
    firstName,
  );
  await fillInputField(
    page,
    inputFieldInfo.lastName.role,
    inputFieldInfo.lastName.name,
    lastName,
  );
  await fillInputField(
    page,
    inputFieldInfo.email.role,
    inputFieldInfo.email.name,
    email,
  );
  await fillInputField(page, "radio", gender);
  await fillInputField(
    page,
    inputFieldInfo.mobileNumber.role,
    inputFieldInfo.mobileNumber.name,
    mobileNumber,
  );

  await page.locator(inputFieldInfo.dateOfBirth.locator).click();
  await page
    .locator(inputFieldInfo.dateOfBirth.year.locator)
    .selectOption(dateOfBirth.year);
  await page
    .locator(inputFieldInfo.dateOfBirth.month.locator)
    .selectOption(dateOfBirth.month);
  await page
    .locator(
      `${inputFieldInfo.dateOfBirth.day.locator}${dateOfBirth.day.padStart(2, "0")}:not(.react-datepicker__day--outside-month)`,
    )
    .click();

  await page.locator(inputFieldInfo.subjects.locator).click();
  await page.locator(inputFieldInfo.subjects.locator).fill(subjects);
  await page
    .getByRole(inputFieldInfo.subjects.role, { name: subjects })
    .click();

  for (const hobby of hobbies) {
    await page
      .locator("div")
      .filter({ hasText: new RegExp(`^${hobby}$`) })
      .click();
  }

  await page
    .getByRole(inputFieldInfo.picturePath.role, {
      name: inputFieldInfo.picturePath.name,
    })
    .setInputFiles(picturePath);

  await fillInputField(
    page,
    inputFieldInfo.address.role,
    inputFieldInfo.address.name,
    address,
  );

  await page.locator(inputFieldInfo.state.locator).click();
  await page.getByRole(inputFieldInfo.state.role, { name: state }).click();
  await page.locator(inputFieldInfo.city.locator).click();
  await page.getByRole(inputFieldInfo.city.role, { name: city }).click();

  await page
    .getByRole(inputFieldInfo.submitButton.role, {
      name: inputFieldInfo.submitButton.name,
    })
    .click();
}
