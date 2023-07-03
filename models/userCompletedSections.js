const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Section = require("./section");
const User = require("./user");

const UserCompletedSections = sequelize.define("user_completed_sections", {});
Section.belongsToMany(User, { through: UserCompletedSections });
User.belongsToMany(Section, { through: UserCompletedSections });

module.exports = UserCompletedSections;
