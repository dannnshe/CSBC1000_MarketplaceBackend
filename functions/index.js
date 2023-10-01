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

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



class User {
    constructor(id, email, password, firstName, lastName, walletAddress, ownedNft, listedNft = {}) {
      this.id = id;
      this.email= email;
      this.password = password;
      this.firstName= firstName;
      this.lastName= lastName;
      this.walletAddress= walletAddress;
      this.ownedNft= ownedNft;
      this.listedNft= listedNft;
    }


    const userSchema = {
        type: 'object',
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'   
          },
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          walletAddress:{
            type:'string'
          },
          ownedNft:{
            type: 'object'
          },
          listedNft:{
            type:"object"
          },
          required: ['email', 'password', 'firstName', 'lastName', 'walletAddress', 'ownedNft', 'listedNft']
        }


class nftListings = {
    constructor(id, title, description, category, price, ownerId, creationDate, blockchainRecord, image = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.ownerId = ownerId;
        this.creationDate= creationDate;
        this.blockchainRecord= blockchainRecord;
        this.image= image
        }
}

    const nftListingSchema ={
        type: 'object',
        properties: {
          title: {
            type: 'string'
          },
          description: {
            type: 'string'   
          },
          category: {
            type: 'string'
          },
          price: {
            type: 'number'
          },
          ownerId:{
            type:'string'   //uuid
          },
          creationDate:{
            type: 'number'   
          },
          blockchainRecord:{
            type:"string"
          },
          image:{
            type:"string"    //url
          },
        }
          required: ['title', 'description', 'category', 'price', 'ownerId', 'creationDate', 'blockchainRecord', 'image']
        
    }

class Transaction {
    constructor(id, buyerId, sellerId, nftId, transactionDate, transactionAmount, blockchainConfirmation = {}) {
        this.id = id;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.nftId = nftId;
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.blockchainConfirmation = blockchainConfirmation
        }

        const transactionSchema = {
            type: 'object',
            properties: {
              buyerId: {
                type: 'string'
              },
              sellerId: {
                type: 'string'
              },
              nftId: {
                type: 'string'
              },
              transactionDate: {
                type: 'number'
              },
              transactionAmount: {
                type: 'number'
              },
              blockchainConfirmation: {
                type: 'string'
              },
            },
            required: ['buyerId', 'sellerId', 'nftId', 'transactionDate', 'transactionAmount', 'blockchainConfirmation']
        }

const validate= ActiveXObject.compile(userSchema,transactionSchema)

