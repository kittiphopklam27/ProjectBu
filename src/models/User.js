const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const User = sequelize.define("User", {
  user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_name: { type: DataTypes.STRING, allowNull: false, unique: true },
  user_password: { type: DataTypes.STRING, allowNull: false },
  user_role: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  user_created_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  user_updated_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
