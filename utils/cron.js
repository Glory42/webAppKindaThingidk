const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { getUsdTryRate } = require('../config/api');
const exchangeJsonPath = path.join(__dirname, '../data/exchange.json');

async function updateExchangeRate () {
    try {
        const apiResponse = await getUsdTryRate();
        
        if (!apiResponse || !apiResponse.rates || !apiResponse.rates.TRY) {
            throw new Error('API response format is not as expected');
        }

        const today = new Date();
        const formateDate = today.toISOString().split('T')[0];


        const rate = parseFloat(apiResponse.rates.TRY);
        const exchangeData = JSON.parse(fs.readFileSync(exchangeJsonPath, 'utf-8'));
        const dailyIndex = exchangeData.daily.findIndex(entry => entry.date === formateDate);

        if (dailyIndex !== -1) {
            exchangeData.daily[dailyIndex].rate = rate;
        } else {
            exchangeData.daily.push({
                date: formateDate,
                rate: rate
            });
        };

        fs.writeFileSync(exchangeJsonPath, JSON.stringify(exchangeData, null, 2), 'utf-8');

        console.log(`Rate updated: ${formateDate}, rate: ${rate}`);
    } catch (error) {
        console.error('Rate update could not be made:', error);
    }
};

cron.schedule('0 9 * * *', updateExchangeRate);

console.log('Cron function started');