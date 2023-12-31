const { formattedDateToday } = require("../helpers/formattedDate");
const { User, Car, CarComment } = require("../models");

class Controller {
  static async index(req, res, next) {
    try {
      const result = await Car.findAll({
        include: [User],
        order: [["createdAt", "ASC"]],
      });
      const transform = result.map((el) => {
        delete el.User.dataValues.password;
        return el;
      });
      res.status(200).json(transform);
    } catch (error) {
      next(error);
    }
  }

  static async indexMyCar(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await Car.findAll({
        where: {
          userId,
        },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findCar(id) {
    const result = await Car.findOne({
      include: [User],
      where: {
        id,
      },
    });
    return result;
  }

  static async view(req, res, next) {
    try {
      let id = +req.params.id;
      const result = await Controller.findCar(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async checkPromotionStatus(promotionEndDate) {
    return promotionEndDate != null &&
      promotionEndDate > (await formattedDateToday())
      ? true
      : false;
  }

  static async addCar(req, res, next) {
    try {
      const {
        carName,
        promotionEndDate,
        description,
        price,
        address,
        mileage,
        carPicture,
      } = req.body;

      //check for promotionStatus
      const promotionStatus = await Controller.checkPromotionStatus(
        promotionEndDate
      );

      const addCar = await Car.create({
        carName,
        promotionEndDate,
        description,
        price,
        address,
        mileage,
        carPicture,
        userId: req.user.id,
        promotionStatus,
      });
      res.status(200).json(addCar);
    } catch (error) {
      next(error);
    }
  }

  static async editCar(req, res, next) {
    try {
      let id = +req.params.carId;
      const car = await Controller.findCar(id);
      const {
        carName,
        promotionEndDate,
        description,
        price,
        address,
        mileage,
        carPicture,
      } = req.body;

      //check for promotionStatus
      const promotionStatus = await Controller.checkPromotionStatus(
        promotionEndDate
      );

      await car.update({
        carName,
        promotionEndDate,
        description,
        price,
        address,
        mileage,
        carPicture,
        promotionStatus,
      });
      res.status(200).json({ message: `${car.carName} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      let id = +req.params.carId;
      await CarComment.destroy({
        where: {
          carId: id,
        },
      });
      const car = await Controller.findCar(id);
      if (!car) {
        throw { name: "data not found" };
      }
      await car.destroy();
      res.status(200).json({ message: `${car.carName} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
