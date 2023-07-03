const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Resource = require("./resource");
const Topic = require("./topic");

const TopicResources = sequelize.define("topic_resources", {});
Topic.belongsToMany(Resource, { through: TopicResources });
Resource.belongsToMany(Topic, { through: TopicResources });

module.exports = TopicResources;
