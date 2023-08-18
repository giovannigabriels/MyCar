const { Car } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const id = req.params.carId;
    const findCar = await Car.findOne({
      where: {
        id,
      },
    });
    if (!findCar) {
      throw { name: `data not found` };
    }
    if (findCar.userId !== req.user.id) {
      throw { name: `forbidden` };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization };
