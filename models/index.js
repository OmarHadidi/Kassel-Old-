const { Sequelize, DataTypes, Op } = require("sequelize");
const defineUser = require("./user.model");
const defineTodo = require("./todo.model");
const defineTodoGroup = require("./todo-group.model");
const defineUserTodoGroup = require("./user-todo-group.model");
const defineRole = require("./role.model");
require("dotenv").config();

/**
 * Defines Sequelize Models
 * @param {Sequelize} sequelize
 */
async function defineModels(sequelize) {
    const Todo = defineTodo(sequelize);
    const TodoGroup = defineTodoGroup(sequelize);
    const User_TodoGroup = defineUserTodoGroup(sequelize);
    const User = defineUser(sequelize);
    const Role = defineRole(sequelize);

    TodoGroup.hasMany(Todo)
    Todo.belongsTo(TodoGroup)

    TodoGroup.belongsToMany(User, {
        through: User_TodoGroup,
    });
    User.belongsToMany(TodoGroup, {
        through: User_TodoGroup,
    });

    User.hasMany(Role, { as: "definedRole" });
    Role.belongsTo(User);

    Role.hasMany(User_TodoGroup);
    User_TodoGroup.belongsTo(Role);

    await sequelize.sync({ force: true });
}

// To run here
const sequelize = new Sequelize(process.env.DB_URI);
sequelize.authenticate().then(() => defineModels(sequelize));

module.exports = defineModels;
