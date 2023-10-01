const Ajv = require("ajv");
const ajv = new Ajv();

const logger = require("firebase-functions/logger");

// eslint-disable-next-line require-jsdoc
class nftListings {
  constructor(id, title, description, category, price, ownerId, creationDate, blockchainRecord, image = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.ownerId = ownerId;
    this.creationDate= creationDate;
    this.blockchainRecord= blockchainRecord;
    this.image= image;
  }
}


const nftListingSchema ={
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    category: {
      type: "string",
    },
    price: {
      type: "number",
    },
    ownerId: {
      type: "string", // uuid
    },
    creationDate: {
      type: "number",
    },
    blockchainRecord: {
      type: "string",
    },
    image: {
      type: "string",
    },
  },
  required: ["title", "description", "category", "price", "ownerId", "creationDate", "blockchainRecord", "image"],
};

const createNftListing = (req) => {
  logger.log("create user called");
  const nftListingsData = new nftListings(req.id,
      req.title,
      req.description,
      req.category,
      req.price,
      req.ownerId,
      req.creationDate,
      req.blockchainRecord,
      req.image);
  logger.log(nftListingsData, "after constructor");
  const validatorResponse = validate(nftListingsData);
  logger.log(validatorResponse);
  return nftListingsData;
};


const validate =(nftListingsData) => {
  logger.log("going to compile");
  const validator = ajv.compile(nftListingSchema);
  logger.log("going to validate");

  if (validator(nftListingsData)) {
    logger.log(validator);
  } else {
    logger.log(validator.errors);
  }
};

module.exports = {createNftListing};

