const { getUsdTryRate } = require('../config/api');

const getLatestUsdTryRate = async (req, res) => {
    try {
        const data = await getUsdTryRate();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Could not get rate change" });
    }
};

module.exports = {
    getLatestUsdTryRate,
};