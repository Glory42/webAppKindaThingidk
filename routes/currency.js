const express = require('express');
const { getLatestUsdTryRate } = require('../controllers/currencyController');
const router = express.Router();

router.get('/latest', getLatestUsdTryRate);

module.exports = router;