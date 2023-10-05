const {v4: uuidv4} = require("uuid");
const {createTransaction, retrieveTransaction } = require("../model/Transaction");
const {retrieve, update}  = require("../model/user");
const {retrieveNftListings}  = require("../model/nftListings");

const {createTransactionValidate} = require("../validators/Transaction");

const logger = require("firebase-functions/logger");
// add investor
const createTransactionController = async (req, res) => {
  try {

    const transaction = req.body;
    transaction["transactionId"] = uuidv4();

    let nftId = req.body.nftId;
    logger.log("going to call retrieve nft ", nftId);
    let nftListing = await retrieveNftListings(nftId);
    logger.log(nftListing);
    let buyerId = req.body.buyerId;
    let sellerId = req.body.sellerId;
    let buyer = null;
    let seller = null;
    if(nftListing){

      buyer = await retrieve(buyerId);
      seller = await retrieve(sellerId);

      logger.log('hi buyer')
      logger.log(buyer);
      if(!buyer){
        res.status(400).json({
          message: "invalid buyer",
        });
        return;
      }
      if(!seller){
        res.status(400).json({
          message: "invalid seller",
        });
        return;
      }
    }else{
      res.status(400).json({
        message: "invalid nft listing",
      });
      return;
    }

    const transactionModel = createTransactionValidate(transaction);

    logger.log(transactionModel);
    await createTransaction(transactionModel);

    seller.ownedNfts.push(nftId);
    seller.listedNfts.push(nftId);

    seller.ownedNfts = seller.ownedNfts.filter( nftEntId => nftEntId !== nftId);
    seller.listedNfts = seller.listedNfts.filter( nftEntId => nftEntId !== nftId);

    update(buyerId, buyer);
    update(sellerId, seller);

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
