const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = require("./user");

const Problem = sequelize.define("problem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  platform: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  difficulty: {
    type: Sequelize.NUMBER,
  },
  successRate: {
    type: Sequelize.NUMBER,
  },
  acceptance: {
    type: Sequelize.NUMBER
  }
});

const UserCompletedProblems = sequelize.define('user_completed_problems', {});
Problem.belongsToMany(User, {through: UserCompletedProblems});
User.belongsToMany(Problem, {through: UserCompletedProblems});

module.exports = Problem;
