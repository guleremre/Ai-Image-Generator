const expressValidator = require("express-validator");
// const config = require("../config");
// const jwt = require("jsonwebtoken");
// const sync_function = require("../functions/sync_functions");

module.exports = {
  validate: (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ success: false, message: errors });
    } else {
      next();
    }
  },
};
