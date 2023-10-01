/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
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
app.use("/", investorRoutes);
app.use("/", userRoutes);




//
//
// class nftListings {
//     constructor(id, title, description, category, price, ownerId, creationDate, blockchainRecord, image = {}) {
//         this.id = id;
//         this.title = title;
//         this.description = description;
//         this.category = category;
//         this.price = price;
//         this.ownerId = ownerId;
//         this.creationDate= creationDate;
//         this.blockchainRecord= blockchainRecord;
//         this.image= image
//         }
// }
//
//     const nftListingSchema ={
//         type: 'object',
//         properties: {
//           title: {
//             type: 'string'
//           },
//           description: {
//             type: 'string'
//           },
//           category: {
//             type: 'string'
//           },
//           price: {
//             type: 'number'
//           },
//           ownerId:{
//             type:'string'   //uuid
//           },
//           creationDate:{
//             type: 'number'
//           },
//           blockchainRecord:{
//             type:"string"
//           },
//           image:{
//             type:"string"    //url
//           },
//         }
//           required: ['title', 'description', 'category', 'price', 'ownerId', 'creationDate', 'blockchainRecord', 'image']
//
//     }
//
// class Transaction {
//     constructor(id, buyerId, sellerId, nftId, transactionDate, transactionAmount, blockchainConfirmation = {}) {
//         this.id = id;
//         this.buyerId = buyerId;
//         this.sellerId = sellerId;
//         this.nftId = nftId;
//         this.transactionDate = transactionDate;
//         this.transactionAmount = transactionAmount;
//         this.blockchainConfirmation = blockchainConfirmation
//         }
//
//         const transactionSchema = {
//             type: 'object',
//             properties: {
//               buyerId: {
//                 type: 'string'
//               },
//               sellerId: {
//                 type: 'string'
//               },
//               nftId: {
//                 type: 'string'
//               },
//               transactionDate: {
//                 type: 'number'
//               },
//               transactionAmount: {
//                 type: 'number'
//               },
//               blockchainConfirmation: {
//                 type: 'string'
//               },
//             },
//             required: ['buyerId', 'sellerId', 'nftId', 'transactionDate', 'transactionAmount', 'blockchainConfirmation']
//         }
//

//

