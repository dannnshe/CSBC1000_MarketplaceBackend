//
// class User {
//     constructor(id, email, password, firstName, lastName, walletAddress, ownedNft, listedNft = {}) {
//       this.id = id;
//       this.email= email;
//       this.password = password;
//       this.firstName= firstName;
//       this.lastName= lastName;
//       this.walletAddress= walletAddress;
//       this.ownedNft= ownedNft;
//       this.listedNft= listedNft;
//     }
//
//
//     const userSchema = {
//         type: 'object',
//         properties: {
//           email: {
//             type: 'string'
//           },
//           password: {
//             type: 'string'
//           },
//           firstName: {
//             type: 'string'
//           },
//           lastName: {
//             type: 'string'
//           },
//           walletAddress:{
//             type:'string'
//           },
//           ownedNft:{
//             type: 'object'
//           },
//           listedNft:{
//             type:"object"
//           },
//           required: ['email', 'password', 'firstName', 'lastName', 'walletAddress', 'ownedNft', 'listedNft']
//         }