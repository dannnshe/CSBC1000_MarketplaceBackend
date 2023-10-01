const {getDB} = require("../config/firebase");

const db = getDB();
const nftListingsCollection = "nftListings";

// create

const createNftListings = async (user) => {
  await db
      .collection(nftListingsCollection)
      .doc(user.id)
      .set(Object.assign({}, user));
};

// retrieve

const retrieveNftListings = async (id) => {
  return await (await db.collection(nftListingsCollection).doc(id).get()).data();
};

// update

const updateNftListings = async (id, user) => {
  await db
      .collection(nftListingsCollection)
      .doc(id)
      .set(user, {merge: true});
};

// delete

const removeNftListings = async (id) => {
  await db.collection(nftListingsCollection).doc(id).delete();
};

module.exports = {createNftListings, retrieveNftListings, updateNftListings, removeNftListings};
