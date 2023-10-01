const Ajv = require("ajv");
const ajv = new Ajv();

const logger = require("firebase-functions/logger");

// eslint-disable-next-line require-jsdoc
class User {
  constructor(id, email, password, firstName, lastName, walletAddress, ownedNfts = [], listedNfts = []) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.walletAddress = walletAddress;
    this.ownedNfts = ownedNfts;
    this.listedNfts = listedNfts;
    logger.log(this);
  }
}


const userSchema = {
  type: "object",
  properties: {
    "email": {
      "type": "string",
    },
    "password": {
      "type": "string",
    },
    "firstName": {
      "type": "string",
    },
    "lastName": {
      "type": "string",
    },
    "walletAddress": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{42}$"
    },
    "ownedNfts": {
      "type": "array",
    },
    "listedNfts": {
      "type": "array",
    },
  },
  required: ["email", "password", "firstName", "lastName", "walletAddress", "ownedNfts", "listedNfts"]
};

const createUser = (req) => {
  logger.log("create user called");
  const userData = new User(req.id,
      req.email,
      req.password,
      req.firstName,
      req.lastName,
      req.walletAddress,
      req.ownedNfts,
      req.listedNfts,
  );
  logger.log(userData, "after constructor");
  const validatorResponse = validate(userData);
  logger.log(validatorResponse);
  return userData;
};


const validate =(userData) => {
  logger.log("going to compile");
  const validator = ajv.compile(userSchema);
  logger.log("going to validate");

  if (validator(userData)) {
    logger.log(validator);
  } else {
    logger.log(validator.errors);
  }
};

module.exports = {validate, createUser};

