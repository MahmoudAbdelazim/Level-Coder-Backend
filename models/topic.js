const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Problem = require("./problem");
const Resource = require("./resource");

const Topic = sequelize.define("topic", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Topic;
