const { Router } = require("express");

const { addUser, getUser } = require("../controller/users");

const router = Router();

// insert investor record
router.post("/user", addUser);

// retrieving investor record
router.get("/user/:id", getUser);

// modifying investor record
// router.put("/investor/:id", modifyInvestor);

// deleting investor record
// router.delete("/investor/:id", removeInvestor);

module.exports = router;