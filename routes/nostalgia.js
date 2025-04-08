const express = require('express');
const { compareHistoricalPrices } = require('../controllers/nostalgiaController');
const router = express.Router();

router.get('/compare', compareHistoricalPrices);

module.exports = router;