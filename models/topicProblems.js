const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Problem = require("./problem");
const Topic = require("./topic");

const TopicProblems = sequelize.define("topic_problems", {});
Topic.belongsToMany(Problem, { through: TopicProblems });
Problem.belongsToMany(Topic, { through: TopicProblems });

module.exports = TopicProblems;
