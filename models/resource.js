const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");

const Resource = sequelize.define("resource", {
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
  language: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
});

const UserCompletedResources = sequelize.define('user_completed_resources', {});
Resource.belongsToMany(User, {through: UserCompletedResources});
User.belongsToMany(Resource, {through: UserCompletedResources});

module.exports = Resource;
