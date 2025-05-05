const cron = require('node-cron');
const { getUsdTryRate } = require('../config/api');
const { saveExchangeRate } = require('../services/exchangeRateService');

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
        
        await saveExchangeRate(formateDate, rate);

        console.log(`Rate updated: ${formateDate}, rate: ${rate}`);
    } catch (error) {
        console.error('Rate update could not be made:', error);
    }
};

// her gün sabah 9 da çalışıyor
cron.schedule('0 9 * * *', updateExchangeRate);

// uygulama başladığında bri kere çalışsın (kapatılabilir/opsiyonel)
updateExchangeRate();

console.log('Cron function started');