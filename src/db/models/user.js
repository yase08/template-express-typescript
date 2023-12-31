"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.TEXT,
      password: DataTypes.STRING,
      roles: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return user;
};
