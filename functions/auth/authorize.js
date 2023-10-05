
const {getSecret} = require("./authenticator");
const jwt = require("jsonwebtoken");
const logger = require("firebase-functions/logger");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  logger.log("secret is ", getSecret());
  if (authHeader == null) return res.sendStatus(401);



  jwt.verify(authHeader, getSecret(), (err, user) => {
    logger.log(err);
    if (err) return res.sendStatus(403);
    logger.log('validation success');
    logger.log(user);

    req.user = user;
    next();
  });
};

module.exports = {authenticateToken};

