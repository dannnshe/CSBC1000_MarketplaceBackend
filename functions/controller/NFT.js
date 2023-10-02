const { v4: uuidv4 } = require("uuid");
const { createNftListings, removeNftListings, updateNftListings, retrieveNftListings } = require("../model/nftListings");
const {createNftListing } = require("../validators/nftListings");
const logger = require("firebase-functions/logger");

const addnftListings = async (req, res) => {
  try {
    let nft = req.body;
    nft["id"] = uuidv4();


    const nftModel = createNftListing(nft);
    logger.log(nftModel);
    await createNftListings(nftModel);

    res.status(201).json({
      id: nftModel.id,
      message: "successfully added NFT",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

// get investor by id

const retrievenftListings = async (req, res) => {
  try {
    const nftId = req.params.id;

    const nft = await retrieveNftListings(nftId);

    res.status(200).json(nft);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

// modify investor by id

const modifynftListings = async (req, res) => {
  try {
    let nftId = req.params.id;
    let nft = req.body;
    await modifynftListings(nftId, nft);
    const nftUpdated = await retrieveNftListings(nftId);
    res.status(200).json(nftUpdated);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

// delete investor by id

const removenftListings = async (req, res) => {
  try {
    let nftId = req.params.id;
    await removeNftListings(nftId);
    res.status(200).json({ nftId });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = { addnftListings, retrievenftListings, modifynftListings, removenftListings };