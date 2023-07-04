const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");

const Suggestion = sequelize.define("suggestion", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
  },
  topic: {
    type: Sequelize.STRING,
  },
  link: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
});

User.hasMany(Suggestion, {
  foreignKey: "userId",
});
Suggestion.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = Suggestion;
