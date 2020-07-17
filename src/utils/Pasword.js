const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports.generateHash = function (password) {
  return bcrypt.hash(password, saltRounds);
};

module.exports.compareHash = function (plainPassword, encryptedPassword) {
  return bcrypt.compare(plainPassword, encryptedPassword);
};
