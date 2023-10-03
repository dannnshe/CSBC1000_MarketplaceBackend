const {Router} = require("express");

const {addUser, getUser, modifyUser, authenticateUser} = require("../controller/users");

// eslint-disable-next-line new-cap
const router = Router();

// insert investor record
router.get("/user/:id", getUser);

router.post("/user", addUser);

router.post("/user/:id/authenticate", authenticateUser);
// retrieving investor record


// modifying investor record
router.put("/user/:id", modifyUser);

// deleting investor record
// router.delete("/investor/:id", removeInvestor);

module.exports = router;