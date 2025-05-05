const { getUsdTryRate } = require('../config/api');
const { getRecentExchangeRates } = require('../services/exchangeRateService');

const getLatestUsdTryRate = async (req, res) => {
    try {
        // api'dan gelen veriyi al
        const apiData = await getUsdTryRate();

        // DB'den gelen veriyi al
        const dbData = await getRecentExchangeRates(7);

        res.json({
            current: apiData,
            recent: dbData
        });
    } catch (error) {
        res.status(500).json({ error: "Could not get rate change" });
    }
};

module.exports = {
    getLatestUsdTryRate,
};