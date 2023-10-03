const {Router} = require("express");

const {createTransactionController, getTransaction} = require("../controller/Transaction");

const {authenticateToken} = require("../auth/authorize");

const router = Router();

router.post("/transactions", authenticateToken, createTransactionController);

router.get("/transactions/:id", getTransaction);

// router.put("/investor/:id", modifyInvestor);

// router.delete("/investor/:id", removeInvestor);

module.exports = router;
