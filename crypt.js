// const crypto = require('crypto');
// const encryptionKey = crypto.randomBytes(32).toString('hex');
// const iv = crypto.randomBytes(16).toString('hex');
// console.log('Encryption Key:', encryptionKey);
// console.log('IV:', iv);
// const bitcoin = require('bitcoinjs-lib');
// const ECPairFactory = require('ecpair').ECPairFactory;
// const ecc = require('tiny-secp256k1');

// // Create ECPair instance
// const ECPair = ECPairFactory(ecc);

// // Define the network as testnet
// const testnet = bitcoin.networks.testnet;

// // Generate a random key pair
// const keyPair = ECPair.makeRandom({ network: testnet });

// // Get the public key in a compressed format
// const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet });

// console.log("Testnet Address:", address);
// console.log("Private Key (WIF):", keyPair.toWIF());

// const { ethers } = require("ethers");
// require('dotenv').config();

// console.log(process.env.INFURAID, ">????????????");
// const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURAID}`);
// const wallet = ethers.Wallet.createRandom();
// const walletWithProvider = wallet.connect(provider);
// console.log("New Wallet Address:", walletWithProvider.address);
// console.log("Private Key:", walletWithProvider.privateKey);
// const address = "0xb0f5481Ec282DBA25E042575c8f054c0fF51a51b";
// console.log(ethers.isAddress(address));



// const crypto = require('crypto');
// const encryptionKey = crypto.randomBytes(32).toString('hex'); 
// console.log("encryptionKey:",encryptionKey)


//tron wallet create
// const { TronWeb } = require('tronweb');
// const tronWeb = new TronWeb({
// fullHost: 'https://api.shasta.trongrid.io' 
// });

// const createWallet = async () => {
// const account = await tronWeb.createAccount();
// console.log('New TRON Testnet Wallet:', account);
// };

// createWallet();



//XRP wallet creation
const xrpl = require('xrpl')

async function createTestnetWallet() {
const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
await client.connect()

const wallet = xrpl.Wallet.generate()

console.log(`Address: ${wallet.classicAddress}`)
console.log(`Seed: ${wallet.seed}`)

try {
const response = await client.fundWallet(wallet)
console.log(response) 

if (response.result && response.result.account_data) {
console.log(`Funded: ${response.result.account_data.Balance} drops`)
} else if (response.result && response.result.balance) {
console.log(`Funded: ${response.result.balance} drops`)
} else {
console.log('Funding failed or unexpected response format')
}
} catch (error) {
console.error('Error funding wallet:', error)
}

await client.disconnect()
}

createTestnetWallet()

// const eccrypto = require('eccrypto');
// require('dotenv').config();

// const publicKey = Buffer.from(process.env.Encryption_public_key,'hex');
// const privateKey = "cRQPMzktdJcpPm85Ptei18RN3THcNDqsHwtnPTj6qSAJh8Kuaj2u";

// eccrypto.encrypt(publicKey,Buffer.from(privateKey)).then(async function(encrypted) {
//   const currency_private_key = 
//   encrypted.iv.toString('hex') + 
//   encrypted.ephemPublicKey.toString('hex') + 
//   encrypted.ciphertext.toString('hex') + 
//   encrypted.mac.toString('hex');

//   console.log("currency_private_key---->>>>>",currency_private_key);
// })