const { Sequelize, DataTypes, Op } = require("sequelize");
require("dotenv").config();

function getModels(sequelize) {
    const models = {
        Todo: require("./Todo.model")(sequelize),
        TodoGroup: require("./TodoGroup.model")(sequelize),
        User_TodoGroup: require("./UserTodoGroup.model")(sequelize),
        User: require("./User.model")(sequelize),
        Role: require("./Role.model")(sequelize),
        UserCreds: require("./UserCreds.model")(sequelize),
    };
    return models;
}

/**
 * Defines Sequelize Models
 * @param {Sequelize} sequelize
 */
async function setupModels(sequelize) {
    const { Todo, TodoGroup, User_TodoGroup, User, Role, UserCreds } =
        getModels(sequelize);

    // Relations
    TodoGroup.hasMany(Todo);
    Todo.belongsTo(TodoGroup);

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

    User.hasOne(UserCreds);
    UserCreds.belongsTo(User);

    // await sequelize.sync({ force: true });
    await sequelize.sync();
}

// To run here
const sequelize = new Sequelize(process.env.DB_URI);
sequelize.authenticate().then(() => setupModels(sequelize));

module.exports = {
    setupModels,
    getModels,
};
