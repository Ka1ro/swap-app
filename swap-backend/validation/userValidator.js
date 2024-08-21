const {body, ValidationResult} = require('express-validator');


module.exports = [
  body("login", "short login").isString().isLength({min:3}),
  body("email", "wrong email").isString().isLength({min: 5}),
  /// ##add location validation by adding .custom((value, { req }) => {}###
  body("location", "wrongLocation").isString(),
  body("collection").isArray().optional(),
  body("avatarUrl").isURL().optional(),
  body("password").isString(),
]