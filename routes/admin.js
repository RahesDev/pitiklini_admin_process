
const express = require('express');
const router = express.Router();
const { createAdminWallet, getPrivateKeyShare,createAdminWalletETH, getPrivateKeyShareETH,createAdminWalletTRX,getPrivateKeyShareTRX, getPrivateKeyShareXRP,createAdminWalletXRP } = require('../controllers/adminController');
const verifySignature= require('../middleware/signatureMiddleware');
const whitelistMiddleware = require('../middleware/whitelistMiddleware');
// router.post('/createAdminWallet', createAdminWallet);
router.get('/createAdminWallet', createAdminWallet);
router.get('/createAdminWalletETH', createAdminWalletETH);
router.get('/createAdminWalletTRX', createAdminWalletTRX);
// router.post('/createAdminWalletXRP', createAdminWalletXRP);
router.get('/createAdminWalletXRP', createAdminWalletXRP);
router.get('/getPrivateKeyShareTRX/:part', whitelistMiddleware, verifySignature, getPrivateKeyShareTRX);
router.get('/getPrivateKeyShareXRP/:part', whitelistMiddleware, verifySignature, getPrivateKeyShareXRP);
router.get('/getPrivateKeyShare/:part', whitelistMiddleware, verifySignature, getPrivateKeyShare);
router.get('/getPrivateKeyShareETH/:part',whitelistMiddleware,verifySignature,getPrivateKeyShareETH);

module.exports = router;
