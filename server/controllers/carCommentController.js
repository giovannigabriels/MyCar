const { CarComment, User } = require("../models");

class Controller {
  static async indexByCarId(req, res, next) {
    try {
      const carId = req.params.idCar;
      const result = await CarComment.findAll({
        include: [User],
        where: {
          carId,
        },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req, res, next) {
    try {
      const {carId,text} = req.body;
      const userId = req.user.id;
      const addCarComment = await CarComment.create({
        carId,text,userId
      });
      res.status(200).json(addCarComment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
