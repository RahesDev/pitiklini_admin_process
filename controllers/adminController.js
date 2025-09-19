const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').ECPairFactory;
const { TronWeb } = require('tronweb');
const ecc = require('tiny-secp256k1');
const secrets = require('secrets.js-grempe');
const { ethers } = require("ethers");
const Admin = require('../models/admin');
const PrivateKeyShare = require('../models/privateKeyShare');
const bcrypt = require('bcrypt');
const ECPair = ECPairFactory(ecc);
const xrpl = require('xrpl')
const testnet = bitcoin.networks.testnet;
const mainnet = bitcoin.networks.bitcoin;
const eccrypto = require('eccrypto');
const crypto = require('crypto');


const publicKey = Buffer.from(process.env.Encryption_public_key,'hex');

async function createAdminWallet(req, res) {
    try {
        // const { name, email, password } = req.body;
        let name = "Pitiklini";
        let email = "support@pitiklini.com";
        let password = "Pitiklini123";
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // const keyPair = ECPair.makeRandom({ network: testnet });
        // const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet });
        const keyPair = ECPair.makeRandom({ network: mainnet });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: mainnet });
        const privateKey = keyPair.toWIF();
        const shares = secrets.share(secrets.str2hex(privateKey), 3, 3);

        eccrypto.encrypt(publicKey, Buffer.from(privateKey)).then(async function (encrypted) {
            const currency_private_key =
                encrypted.iv.toString('hex') +
                encrypted.ephemPublicKey.toString('hex') +
                encrypted.ciphertext.toString('hex') +
                encrypted.mac.toString('hex');

            const admin = new Admin({ name, email, password: hashedPassword, address, privateKey: currency_private_key });
            await admin.save();
            await Promise.all(shares.map((share, index) => {
                const privateKeyShare = new PrivateKeyShare({ share, part: index + 1, network: 'BTC' });
                return privateKeyShare.save();
            }));

            res.json({ message: 'Admin wallet created and private key split successfully', address, privateKey });
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getPrivateKeyShare(req, res) {
    try {
        const { part } = req.params;
        console.log("call paramsBTC", part);
        const privateKeyShare = await PrivateKeyShare.findOne({ part, network: 'BTC' });
        if (!privateKeyShare) {
            return res.status(404).json({ error: 'Private key share not found' });
        }
        res.json(privateKeyShare.share);
    } catch (error) {
        console.log("private key error ===", error.message)
        res.status(500).json({ error: error.message });
    }
}

async function createAdminWalletETH(req, res) {
    try {
        // const { name, email, password } = req.body;
        let name = "Pitiklini";
        let email = "support@pitiklini.com";
        let password = "Pitiklini123";
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        const privateKey = wallet.privateKey;
        const shares = secrets.share(secrets.str2hex(privateKey), 3, 3);

        eccrypto.encrypt(publicKey, Buffer.from(privateKey)).then(async function (encrypted) {
            const currency_private_key =
                encrypted.iv.toString('hex') +
                encrypted.ephemPublicKey.toString('hex') +
                encrypted.ciphertext.toString('hex') +
                encrypted.mac.toString('hex');

            const admin = new Admin({ name, email, password: hashedPassword, address, privateKey: currency_private_key });
            await admin.save();
            await Promise.all(shares.map((share, index) => {
                const privateKeyShare = new PrivateKeyShare({ share, part: index + 1, network: 'ETH' });
                return privateKeyShare.save();
            }));
            res.json({ message: 'Admin wallet created and private key split successfully', address, privateKey });
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPrivateKeyShareETH(req, res) {
    try {
        const { part } = req.params;
        console.log("call paramsETH ", part);
        const privateKeyShare = await PrivateKeyShare.findOne({ part, network: 'ETH' });
        if (!privateKeyShare) {
            return res.status(404).json({ error: 'Private key share not found' });
        }
        res.json(privateKeyShare.share);
    } catch (error) {
        console.log("private key error ===", error.message);
        res.status(500).json({ error: error.message });
    }
}
const tronWeb = new TronWeb({
    // fullHost: 'https://api.shasta.trongrid.io'
    // fullHost: 'https://nile.trongrid.io'
    fullHost: 'https://api.trongrid.io'
});

async function createAdminWalletTRX(req, res) {
    try {
        // const { name, email, password } = req.body;
        let name = "Pitiklini";
        let email = "support@pitiklini.com";
        let password = "Pitiklini123";
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const account = await tronWeb.createAccount();
        console.log("account===",account);
        const address = account.address.base58;
        const privateKey = account.privateKey;

        eccrypto.encrypt(publicKey, Buffer.from(privateKey)).then(async function (encrypted) {
            const currency_private_key =
                encrypted.iv.toString('hex') +
                encrypted.ephemPublicKey.toString('hex') +
                encrypted.ciphertext.toString('hex') +
                encrypted.mac.toString('hex');

            const shares = secrets.share(secrets.str2hex(privateKey), 3, 3);

            const admin = new Admin({ name, email, password: hashedPassword, address, privateKey: currency_private_key });
            await admin.save();

            await Promise.all(shares.map((share, index) => {
                const privateKeyShare = new PrivateKeyShare({ share, part: index + 1, network: 'TRX' });
                return privateKeyShare.save();
            }));

            res.json({ message: 'Admin wallet created and private key split successfully', address, privateKey });
        })
    } catch (error) {
        console.error("Error creating admin wallet:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getPrivateKeyShareTRX(req, res) {
    try {
        const { part } = req.params;
        console.log("call paramsTRX", part);
        const privateKeyShare = await PrivateKeyShare.findOne({ part, network: 'TRX' });
        if (!privateKeyShare) {
            return res.status(404).json({ error: 'Private key share not found' });
        }
        res.json(privateKeyShare.share);
    } catch (error) {
        console.log("private key error ===", error.message);
        res.status(500).json({ error: error.message });
    }
}


async function createAdminWalletXRP(req, res) {
    try {
        // const { name, email, password } = req.body
        let name = "Pitiklini";
        let email = "support@pitiklini.com";
        let password = "Pitiklini123";
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const client = new xrpl.Client('ws://s1.ripple.com:51233')
        await client.connect()
        const wallet = xrpl.Wallet.generate("ed25519")
        const address = wallet.classicAddress;
        const privateKey = wallet.seed;
        eccrypto.encrypt(publicKey,Buffer.from( privateKey)).then(async function(encrypted) {
        const currency_private_key = 
        encrypted.iv.toString('hex') + 
        encrypted.ephemPublicKey.toString('hex') + 
        encrypted.ciphertext.toString('hex') + 
        encrypted.mac.toString('hex');
        const shares = secrets.share(secrets.str2hex(privateKey), 3, 3)
        const admin = new Admin({ name, email, password: hashedPassword, address, privateKey:currency_private_key })
        await admin.save()
        await Promise.all(shares.map((share, index) => {
            const privateKeyShare = new PrivateKeyShare({ share, part: index + 1, network: 'XRP' })
            return privateKeyShare.save()
        }))
        res.json({ message: 'Admin wallet created and private key split successfully', address, privateKey })
        await client.disconnect()
      })
    } catch (error) {
        console.error('Error creating admin wallet:', error)
        res.status(500).json({ error: error.message })
    }
}

async function getPrivateKeyShareXRP(req, res) {
    try {
        const { part } = req.params
        console.log("call paramsXRP", part)

        const privateKeyShare = await PrivateKeyShare.findOne({ part, network: 'XRP' })
        if (!privateKeyShare) {
            return res.status(404).json({ error: 'Private key share not found' })
        }

        res.json(privateKeyShare.share);
    } catch (error) {
        console.log("private key error ===", error.message)
        res.status(500).json({ error: error.message })
    }
}

async function getPrivateKeyShareARB(req, res) {
    try {
        const { part } = req.params;
        console.log("call params", part);
        const privateKeyShare = await PrivateKeyShare.findOne({ part });
        if (!privateKeyShare) {
            return res.status(404).json({ error: 'Private key share not found' });
        }
        res.send(privateKeyShare.share );
    } catch (error) {
        console.log("private key error ===", error.message);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createAdminWallet, getPrivateKeyShare, getPrivateKeyShareETH, createAdminWalletETH, createAdminWalletTRX, getPrivateKeyShareTRX,
    createAdminWalletXRP, getPrivateKeyShareXRP,getPrivateKeyShareARB
};