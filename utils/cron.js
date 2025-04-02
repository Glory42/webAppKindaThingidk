const cron = require('node-cron');
const { getUsdTryRate } = require('../config/api');

cron.schedule('0 9 * * *', async () => {
    try {
        await getUsdTryRate();
        console.log('Rate updated');
    } catch (error) {
        console.error('Rate updated could not be made:', error);
    }
});

console.log('Cron function started');