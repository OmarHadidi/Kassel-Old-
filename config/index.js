const { Sequelize } = require("sequelize");
require("dotenv").config();

const { getModels } = require("../models");

const sequelize = new Sequelize(process.env.DB_URI);

module.exports = {
    sequelize: sequelize,
    models: getModels(sequelize),
};
