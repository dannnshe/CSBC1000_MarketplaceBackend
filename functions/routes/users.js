const { Router } = require("express");

const { addUser, getUser, modifyUser } = require("../controller/users");

const router = Router();

// insert investor record
router.get("/viewuser/:id", getUser);

router.post("/user", addUser);

// retrieving investor record


// modifying investor record
router.put("/user/:id", modifyUser);

// deleting investor record
// router.delete("/investor/:id", removeInvestor);

module.exports = router;