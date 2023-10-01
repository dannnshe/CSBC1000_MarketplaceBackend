const {getDB} = require("../config/firebase");

const db = getDB();
const userCollection = "users";

// create

const create = async (user) => {
  await db
      .collection(userCollection)
      .doc(user.id)
      .set(Object.assign({}, user));
};

// retrieve

const retrieve = async (id) => {
  return await (await db.collection(userCollection).doc(id).get()).data();
};

// update

const update = async (id, user) => {
  await db
      .collection(userCollection)
      .doc(id)
      .set(user, {merge: true});
};

// delete

const remove = async (id) => {
  await db.collection(userCollection).doc(id).delete();
};

module.exports = {create, retrieve, update, remove};
