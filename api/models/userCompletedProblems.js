const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Problem = require("./problem");
const User = require("./user");

const UserCompletedProblems = sequelize.define("user_completed_problems", {});
Problem.belongsToMany(User, { through: UserCompletedProblems });
User.belongsToMany(Problem, { through: UserCompletedProblems });

module.exports = UserCompletedProblems;
