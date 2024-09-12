import chalk from "chalk";

const log = console.log,
  isValidProjectName = (name) => {
    const regex =
      /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/;
    return regex.test(name);
  },
  sucessLog = (message) => log(chalk.green(message)),
  errorLog = (message) => log(chalk.red(message)),
  warnLog = (message) => log(chalk.yellow(message)),
  infoLog = (message) => log(chalk.blue(message));

export { isValidProjectName, sucessLog, errorLog, warnLog, infoLog };
