import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, "backend\\logs\\error.log");


export const errorLogger = async (error) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ${
    error instanceof Error ? error.stack : error
  }\n`;

  console.error(errorMessage);

  try {
    let existingContent = "";
    if (fs.existsSync(logFilePath)) {
      existingContent = fs.readFileSync(logFilePath, "utf8");
    }

    const newContent = errorMessage + existingContent;

    fs.writeFileSync(logFilePath, newContent, "utf8");
  } catch (fileError) {
    console.error(
      `[${timestamp}] Failed to write to log file: ${fileError.message}`
    );
  }
};
