const { Sequelize, DataTypes, Op } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
module.exports = function (sequelize) {
    return sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                notEmpty: true,
            },
            set(name) {
                const preparedName = name.trim().toLowerCase();
                this.setDataValue("name", preparedName);
            },
        },
        email: {
            type: DataTypes.STRING,
            // allowNull:false,
            validate: {
                isEmail: true,
            },
        },
    });
};
