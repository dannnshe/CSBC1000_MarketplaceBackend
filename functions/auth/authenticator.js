

const secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";
const jwt = require("jsonwebtoken");
const logger = require("firebase-functions/logger");

const generateAccessToken = (userId) => {
  console.log(userId);
  logger.log("authentication");
  const signedToken = jwt.sign({"data":userId}, secret, {expiresIn: "1800s"});

  logger.log(signedToken);
  return signedToken;
};

module.exports = {generateAccessToken, secret};

