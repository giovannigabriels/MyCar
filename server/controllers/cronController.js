const moment = require("moment");
const { Op } = require("sequelize");
const { Car } = require("../models");

class Controller {
  static async cronJob() {
    try {
      console.log("cron job execute");
      const updatedCarsWithPromotion = await Car.update(
        { promotionStatus: false },
        {
          where: {
            promotionStatus: true,
            promotionEndDate: {
              [Op.lt]: moment().add(7, "hours").startOf("day"),
            },
          },
        }
      );
      console.log(
        "cron job execute every 00:00 AM for update promotion status"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
