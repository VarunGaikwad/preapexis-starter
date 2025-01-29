#!/usr/bin/env node

import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import fse from "fs-extra";
import { isValidProjectName, sucessLog, errorLog } from "./util/util.js";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  log = console.log,
  { argv, cwd, exit, stdin, stdout } = process,
  currentPath = cwd(),
  typescriptReact = path.join(__dirname, "ts_react"),
  javascriptReact = path.join(__dirname, "js_react");

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function createProject(name) {
  const newFolderPath = path.join(currentPath, name),
    packageJsonPath = path.join(newFolderPath, "package.json");

  rl.question(
    "Do you want TypeScript or JavaScript? (ts/js): ",
    async function (choice) {
      let templatePath;
      if (choice.toLowerCase() === "ts") {
        templatePath = typescriptReact;
      } else if (choice.toLowerCase() === "js") {
        templatePath = javascriptReact;
      } else {
        errorLog("Invalid choice. Please enter 'ts' or 'js'.");
        rl.close();
        exit(1);
      }

      try {
        await fse.ensureDir(newFolderPath);
        await fse.copy(templatePath, newFolderPath);

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
    }
  );
}

const projectName = argv[2];

if (projectName && isValidProjectName(projectName)) {
  createProject(projectName);
} else if (projectName) {
  errorLog("Invalid project name provided.");
  exit(1);
} else {
  rl.question("Enter your project name: ", function (name) {
    if (!isValidProjectName(name)) {
      errorLog("Invalid project name");
      rl.close();
      exit(1);
    }
    createProject(name);
  });
}
