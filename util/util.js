import chalk from "chalk";

const log = console.log;
function isValidProjectName(name) {
  const regex = /^[a-z0-9-]+$/;
  return regex.test(name);
}

const sucessLog = (message) => log(chalk.green(message)),
  errorLog = (message) => log(chalk.red(message)),
  warnLog = (message) => log(chalk.yellow(message)),
  infoLog = (message) => log(chalk.blue(message));

export { isValidProjectName, sucessLog, errorLog, warnLog, infoLog };
