const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  sub: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Resource.hasMany(Section, {
  foreignKey: "resourceId",
});
Section.belongsTo(Resource, {
  foreignKey: "resourceId",
  as: "resource",
});

module.exports = Section;
