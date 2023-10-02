const {v4: uuidv4} = require("uuid");
const {createTransaction, retrieveTransaction } = require("../model/Transaction");

const {createTransactionValidate} = require("../validators/Transaction");

const logger = require("firebase-functions/logger");
// add investor
const createTransactionController = async (req, res) => {
  try {
    logger.log("inside controller");
    const transaction = req.body;
    transaction["transactionId"] = uuidv4();


    const transactionModel = createTransactionValidate(transaction);
    logger.log(transactionModel);
    await createTransaction(transactionModel);

    res.status(201).json({
      id: transaction.transactionId,
      message: "successfully added new Transaction",
    });
  } catch (error) {
    logger.log(error);
    res.status(400).json({
      error: error,
    });
  }
};

// get investor by id

const getTransaction = async (req, res) => {
  try {
    logger.log("entering get transactions api");
    const transactionId = req.params.id;

    const transaction = await retrieveTransaction(transactionId);

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};


module.exports = {createTransactionController, getTransaction};
