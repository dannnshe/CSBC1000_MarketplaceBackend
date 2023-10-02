const { Router } = require("express");

const { createTransactionController, getTransaction } = require("../controller/Transaction");

const router = Router();

router.post("/transactions", createTransactionController);

router.get("/transactions/:id", getTransaction);

// router.put("/investor/:id", modifyInvestor);

// router.delete("/investor/:id", removeInvestor);

module.exports = router;