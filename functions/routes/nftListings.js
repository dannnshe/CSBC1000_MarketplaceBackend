const { Router } = require("express");

const { addnftListings, retrievenftListings, modifynftListings, removenftListings} = require("../controller/NFT");

const router = Router();

// insert investor record
router.post("/nftListings", addnftListings);

// retrieving investor record
router.get("/nftListings/:id", retrievenftListings);

router.put("/nftListings/:id", modifynftListings);

router.delete("/nftListings/:id", removenftListings);

module.exports = router;