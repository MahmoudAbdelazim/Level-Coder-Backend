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

const TopicProblems = sequelize.define("topic_problems", {});
Topic.belongsToMany(Problem, { through: TopicProblems });
Problem.belongsToMany(Topic, { through: TopicProblems });

const TopicResources = sequelize.define("topic_resources", {});
Topic.belongsToMany(Resource, { through: TopicResources });
Resource.belongsToMany(Topic, { through: TopicResources });

module.exports = Topic;
