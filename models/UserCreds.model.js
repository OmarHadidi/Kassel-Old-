const { Sequelize, DataTypes, Op } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
module.exports = function (sequelize) {
    const User = require('./User.model')(sequelize);
    
    return sequelize.define("UserCreds", {
        username: {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        },
        UserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
            primaryKey:true,
        }
    });
};
