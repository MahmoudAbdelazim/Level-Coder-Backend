const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Resource = require("./resource");
const User = require("./user");

const UserCompletedResources = sequelize.define("user_completed_resources", {});
Resource.belongsToMany(User, { through: UserCompletedResources });
User.belongsToMany(Resource, { through: UserCompletedResources });

module.exports = UserCompletedResources;
