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
    type: Sequelize.INTEGER,
  },
  successRate: {
    type: Sequelize.INTEGER,
  },
  acceptance: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Problem;
