const { Sequelize, DataTypes, Op } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
module.exports = function (sequelize) {
    return sequelize.define("Role", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        // permissions
        // todos
        addTodo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
        deleteTodo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
        editTodo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
        // todo groups
        deleteTodoGroup: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
        editTodoGroup: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
    });
};
