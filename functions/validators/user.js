const Ajv = require("ajv");
const ajv = new Ajv();
const bcrypt = require("bcrypt");

const logger = require("firebase-functions/logger");
const saltRounds = 10; // You can adjust this based on your security needs


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
      "type": "string"
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
  const hashedPassword = bcrypt.hashSync(req.password, saltRounds);

  logger.log(hashedPassword);

  const userData = new User(req.id,
      req.email,
      hashedPassword,
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
    logger.log('validation is good');
  } else {
    logger.error(validator.errors);
  }
};

module.exports = {validate, createUser};

