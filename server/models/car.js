"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, { foreignKey: "userId" });
      Car.hasMany(models.CarComment, { foreignKey: "carId" });
    }
  }
  Car.init(
    {
      userId: DataTypes.INTEGER,
      carName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required!",
          },
          notEmpty: {
            msg: "Name is required!",
          },
        },
      },
      promotionEndDate: DataTypes.DATE,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required!",
          },
          notEmpty: {
            msg: "Description is required!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required!",
          },
          notEmpty: {
            msg: "Price is required!",
          },
        },
      },
      address: DataTypes.STRING,
      mileage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Mile age is required!",
          },
          notEmpty: {
            msg: "Mile age is required!",
          },
        },
      },
      carPicture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Car Picture is required!",
          },
          notEmpty: {
            msg: "Car Picture is required!",
          },
        },
      },
      promotionStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
