const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getUsdTryRate = async () => {
    try {
        const resposne = await axios.get(
            `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=TRY&base=USD`
        );
        return resposne.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

module.exports = {
    getUsdTryRate,
};