const Ajv = require("ajv");
const ajv = new Ajv();

const logger = require("firebase-functions/logger");

// eslint-disable-next-line require-jsdoc
class Transaction {
  constructor(id, buyerId, sellerId, nftId, transactionDate, transactionAmount, blockchainConfirmation = {}) {
    this.id = id;
    this.buyerId = buyerId;
    this.sellerId = sellerId;
    this.nftId = nftId;
    this.transactionDate = transactionDate;
    this.transactionAmount = transactionAmount;
    this.blockchainConfirmation = blockchainConfirmation
  }
}

const transactionSchema = {
  type: 'object',
  properties: {
    buyerId: {
      type: 'string'
    },
    sellerId: {
      type: 'string'
    },
    nftId: {
      type: 'string'
    },
    transactionDate: {
      type: 'number'
    },
    transactionAmount: {
      type: 'number'
    },
    blockchainConfirmation: {
      type: 'string'
    },
  },
  required: ['buyerId', 'sellerId', 'nftId', 'transactionDate', 'transactionAmount', 'blockchainConfirmation']
}

const createTransactionValidate = (req) => {
  logger.log("create user called");
  const TransactionData = new Transaction(req.transactionId,
      req.buyerId,
      req.sellerId,
      req.nftId,
      req.transactionDate,
      req.transactionAmount,
      req.blockchainConfirmation,
      req.listedNfts,
  );

  logger.log(TransactionData, "after constructor");
  const validatorResponse = validate(TransactionData);
  logger.log(validatorResponse);
  return TransactionData;
};


const validate =(TransactionData) => {
  logger.log("going to compile");
  const validator = ajv.compile(transactionSchema);
  logger.log("going to validate");

  if (validator(TransactionData)) {
    logger.log(validator);
  } else {
    logger.log(validator.errors);
  }
};

module.exports = {createTransactionValidate};

