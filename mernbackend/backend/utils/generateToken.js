const jwt = require("jsonwebtoken");
const str = require("randomstring");
const generateToken = (id, duration) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
