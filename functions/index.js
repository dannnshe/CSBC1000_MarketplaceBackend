/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const bodyParser = require("body-parser");
const { initApp, getAPI } = require("./config/firebase");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



// initialize firebase to access its services

initApp();

// initialize express
const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const webAPI = getAPI(main);
module.exports = { webAPI };

const investorRoutes = require("./routes/investors");
const userRoutes = require("./routes/users");
const nftRoutes = require("./routes/nftListings");
const transactionRoutes = require("./routes/Transaction");
app.use("/", investorRoutes);
app.use("/", userRoutes);
app.use("/", nftRoutes);
app.use("/", transactionRoutes);

