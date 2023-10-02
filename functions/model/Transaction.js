const {getDB} = require("../config/firebase");

const db = getDB();
const transactionsCollection = "transactions";

// create

const createTransaction = async (user) => {
  await db
      .collection(transactionsCollection)
      .doc(user.id)
      .set(Object.assign({}, user));
};

// retrieve

const retrieveTransaction = async (id) => {
  return await (await db.collection(transactionsCollection).doc(id).get()).data();
};

// update

const updateTransaction = async (id, user) => {
  await db
      .collection(transactionsCollection)
      .doc(id)
      .set(user, {merge: true});
};

// delete

const removeTransaction = async (id) => {
  await db.collection(transactionsCollection).doc(id).delete();
};

module.exports = {createTransaction, retrieveTransaction, updateTransaction, removeTransaction};
