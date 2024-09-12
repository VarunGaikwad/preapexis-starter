#!/usr/bin/env node

import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import fse from "fs-extra";
import { isValidProjectName, sucessLog, warnLog } from "./util/util.js";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  log = console.log,
  { argv, cwd, exit, stdin, stdout } = process,
  currentPath = cwd(),
  sampleFolderPath = path.join(__dirname, "sample");

if (argv.length === 2) {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  rl.question("Enter your project name: ", async function (name) {
    if (!isValidProjectName(name)) {
      errorLog("Invalid project name");
      rl.close();
      exit(1);
    }

    const newFolderPath = path.join(currentPath, name),
      packageJsonPath = path.join(newFolderPath, "package.json");

    try {
      await fse.ensureDir(newFolderPath);
      await fse.copy(sampleFolderPath, newFolderPath);

      const packageJson = await fse.readJson(packageJsonPath);
      packageJson.name = name;
      await fse.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      sucessLog(
        `Project created successfully 🌱!\n cd ${name} \n npm install \n npm run dev`
      );
    } catch (error) {
      errorLog(`Error: ${error.message}`);
      exit(1);
    } finally {
      rl.close();
    }
  });
} else {
  warnLog("Usage: npm run <command>");
  exit(1);
}
