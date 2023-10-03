require("dotenv").config();

const { sequelize, models } = require("./models-setup");
const passportConf = require("./passport-setup");
const log = require("./log");
const errors = require("./errors");

module.exports = {
    sequelize,
    models,
    passport: passportConf,
    log,
    errors,
};
