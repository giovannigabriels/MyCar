const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = `Internal server error`;

  if (
    error.name == "SequelizeValidationError" ||
    error.name == "SequelizeUniqueConstraintError"
  ) {
    error = error.errors[0].message;
    code = 400;
    message = error;
  } else if (error.name == `invalid_credentials`) {
    code = 401;
    message = `Invalid phone number or password`;
  } else if (
    error.name == `invalid token` ||
    error.name == `JsonWebTokenError`
  ) {
    code = 401;
    message = `Invalid token`;
  } else if (error.name == "data not found") {
    code = 404;
    message = `data not found`;
  } else if (error.name == `forbidden`) {
    code = 403;
    message = `Forbidden`;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
