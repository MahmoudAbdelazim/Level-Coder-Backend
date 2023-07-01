const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");
const Resource = require("./resource");

const Section = sequelize.define("section", {
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
});

const UserCompletedSections = sequelize.define('user_completed_sections', {});
Section.belongsToMany(User, {through: UserCompletedSections});
User.belongsToMany(Section, {through: UserCompletedSections});

Resource.hasMany(Section, {
  foreignKey: "resourceId",
});
Section.belongsTo(Resource, {
  foreignKey: "resourceId",
  as: "resource"
});

module.exports = Section;
