const chalk = require("chalk");
const { Sequelize, DataTypes, Op } = require("sequelize");
require("dotenv").config();

/**
 * get a list of special methods added to a Model for associations
 * @param {*} model
 */
function getSpecialFuncs(model) {
    console.log("model.associations :>> ", model.associations);
    for (let assoc of Object.keys(model.associations)) {
        for (let accessor of Object.keys(model.associations[assoc].accessors)) {
            console.log(
                chalk.redBright(
                    model.name +
                        "." +
                        model.associations[assoc].accessors[accessor] +
                        "()"
                )
            );
        }
    }
}

/**
 * Gets all Models from files, and Setup Relations between them, then return them in object
 * @param {*} sequelize
 * @returns all models in object
 */
function setupModels(sequelize) {
    const Todo = require("./Todo.model")(sequelize),
        TodoGroup = require("./TodoGroup.model")(sequelize),
        User_TodoGroup = require("./UserTodoGroup.model")(sequelize),
        User = require("./User.model")(sequelize),
        Role = require("./Role.model")(sequelize),
        UserCreds = require("./UserCreds.model")(sequelize);
    const models = {
        Todo,
        TodoGroup,
        User_TodoGroup,
        User,
        Role,
        UserCreds,
    };

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

    // getSpecialFuncs(User);

    return models;
}

/**
 * Defines Sequelize Models
 * @param {*} sequelize
 * @returns Asynchronously Returns all Models with relations applied between them
 */
async function syncModels(sequelize) {
    setupModels(sequelize);
    // await sequelize.sync({ force: true });
    await sequelize.sync();
}

// To run here
const sequelize = new Sequelize(process.env.DB_URI);
sequelize.authenticate().then(async () => {
    await syncModels(sequelize);
    const User = sequelize.model("User");

    // Managed Transaction
    try {
        await sequelize.transaction(async (t) => {
            const u1 = await User.create(
                { name: "test", email: "test@test.test" },
                { transaction: t }
            );
            const u2 = await User.create(
                { name: "test2", email: "test2" },
                { transaction: t }
            );
        });
    } catch (error) {
        console.log(chalk.redBright("Error:"), "ROLLBACK");
        console.log(chalk.redBright(error.name));
        console.log(chalk.gray(error.message));
    }
});

// (async function () {
//     const sequelize = new Sequelize(process.env.DB_URI);
//     await sequelize.authenticate();
//     await syncModels(sequelize);

//     const User = sequelize.model("User");

//     // Managed Transaction
//     try {
//         await sequelize.transaction(async (t) => {
//             const u1 = await User.create(
//                 { name: "test", email: "test@test.test" },
//                 { transaction: t }
//             );
//             const u2 = await User.create(
//                 { name: "test2", email: "test2" },
//                 { transaction: t }
//             );
//         })
//     } catch (error) {
//         console.log(chalk.redBright("Error:"),"ROLLBACK");
//         console.log(chalk.redBright(error.name));
//         console.log(chalk.gray(error.message));
//     }
// })();

module.exports = {
    setupModels,
};
