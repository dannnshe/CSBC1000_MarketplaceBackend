const {v4: uuidv4} = require("uuid");
const {create, retrieve, update} = require("../model/user");

const {createUser} = require("../validators/user");

const logger = require("firebase-functions/logger");
// add investor
const addUser = async (req, res) => {
  try {
    logger.log("inside controller");
    const user = req.body;
    user["id"] = uuidv4();


    const userModel = createUser(user);
    logger.log(userModel);
    await create(userModel);

    res.status(201).json({
      id: user.id,
      message: "successfully added user",
    });
  } catch (error) {
    logger.log(error);
    res.status(400).json({
      error: error,
    });
  }
};

// get investor by id

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await retrieve(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};


const modifyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.body;
    await update(userId, user);
    const userResult = await retrieve(userId);
    res.status(200).json(userResult);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};


module.exports = {addUser, getUser, modifyUser};
