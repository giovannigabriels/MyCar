const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, password, phone } = req.body;
      const newUser = await User.create({
        name,
        password,
        phone,
      });
      res.status(201).json({ id: newUser.id, name: newUser.name });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { phone, password } = req.body;

      const user = await User.findOne({
        where: {
          phone,
        },
      });
      if (!user) {
        throw { name: `invalid_credentials` };
      }
      const passValid = compare(password, user.password);

      if (!passValid) {
        throw { name: `invalid_credentials` };
      }
      //sign
      const payload = {
        id: user.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token, name:user.name , id:user.id});
    } catch (error) {
        console.log(error, "errornya");
      next(error);
    }
  }
}

module.exports = Controller;
