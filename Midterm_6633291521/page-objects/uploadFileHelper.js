import inputFieldInfo from "../test-data/input_field_info.json";

const path = require("path");

export async function uploadFileToForm(page, filePath) {
  await require("../page-objects/navigateToForm").navigateToForm(page);
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(__dirname, filePath);
  const fileInputLocator = inputFieldInfo.picturePath.locator;
  await page.setInputFiles(fileInputLocator, resolvedPath);
  const fileName = await page.locator(fileInputLocator).inputValue();
  return fileName;
}
