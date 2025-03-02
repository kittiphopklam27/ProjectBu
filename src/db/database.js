const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/users.sqlite",
});

module.exports = sequelize;
