"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CarComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarComment.belongsTo(models.User, { foreignKey: "userId" });
      CarComment.belongsTo(models.CarComment, { foreignKey: "carId" });
    }
  }
  CarComment.init(
    {
      carId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CarComment",
    }
  );
  return CarComment;
};
