const {Router} = require("express");

const {addUser, getUser, modifyUser} = require("../controller/users");

// eslint-disable-next-line new-cap
const router = Router();

// insert investor record
router.get("/user/:id", getUser);

router.post("/user", addUser);

// retrieving investor record


// modifying investor record
router.put("/user/:id", modifyUser);

// deleting investor record
// router.delete("/investor/:id", removeInvestor);

module.exports = router;