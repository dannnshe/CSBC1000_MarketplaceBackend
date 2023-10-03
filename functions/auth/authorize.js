
const {secret} = require("./authenticator");
const jwt = require("jsonwebtoken");
const logger = require("firebase-functions/logger");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  logger.log(req.headers)
  logger.log("auth token from header", authHeader);
  if (authHeader == null) return res.sendStatus(401);


  jwt.verify(authHeader, secret, (err, user) => {
    logger.log(err);
    if (err) return res.sendStatus(403);
    logger.log('validation success');
    logger.log(user);

    req.user = user;
    next();
  });
};

module.exports = {authenticateToken};

