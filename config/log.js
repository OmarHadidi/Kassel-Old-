const chalk = require("chalk");

const log = {
    info: (...msg) => console.log(`${chalk.blueBright("info :")}`, ...msg),
    error: (...msg) => console.log(`${chalk.redBright("error :")}`, ...msg),
    system: (...msg) => console.log(`${chalk.yellowBright("system :")}`, ...msg),
    sequelize: (...msg) => console.log(`${chalk.yellowBright("sequelize :")}`, ...msg),
    dump: (msg, value) => console.log(`${chalk.blueBright(msg)} :>> `, value),
};

module.exports = log