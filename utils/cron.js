const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { getUsdTryRate } = require('../config/api');
const exchangeJsonPath = path.join(__dirname, '../data/dailyExchanges.json');

async function updateExchangeRate () {
    try {
        const apiResponse = await getUsdTryRate();
        
        if (!apiResponse || !apiResponse.rates || !apiResponse.rates.TRY) {
            throw new Error('API response format is not as expected');
        }

        const today = new Date();
        //yapanın ellerinden öptüğüm toISOString saolsun TR de zaman kayması oluyor
        //ondan dolayı böyle düzgün çalışmıyor: const formateDate = today.toISOString().split('T')[0];
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formateDate = `${year}-${month}-${day}`;

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