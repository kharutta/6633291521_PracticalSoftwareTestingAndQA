const path = require("path");

export async function uploadFileToForm(page, filePath) {
  await require("../page-objects/navigateToForm").navigateToForm(page);
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(__dirname, filePath);
  await page.setInputFiles('input[type="file"]', resolvedPath);
  const fileName = await page.locator('input[type="file"]').inputValue();
  return fileName;
}
