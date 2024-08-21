const {body} = require('express-validator');


module.exports = [
  body("name", "Wrong").isString().isLength({min:3}),
  body("collectionName", "wrong collection name").isString().isLength({min:3}),
  body("imageUrl").isURL().optional(),
  body("price").isNumeric().optional(),
  body("users").isArray().optional(),
]