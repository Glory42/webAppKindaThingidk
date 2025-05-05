const supabase = require('../config/supabase');

// günlük veriyi kaydet
const saveExchangeRate = async (date, rate) => {
    const { data, error } = await supabase
        .from('daily_exchange_rates')
        .upsert(
            { date, error },
            { onConflict: 'date' }
        );

    if (error) throw error;
    return data; 
};

// son gün kur verisi get
const getRecentExchangeRates = async (limit = 30) => {
    const { data, error } = await supabase
        .from('daily_exchange_rates')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
};

// belirli gün kur verisi get
const getExchangeRatesByDate = async (startDate, endDate) => {
    const { data, error } = await supabase
        .from('daily_exchange_rates')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

    if (error) throw error;
    return data;
};

module.exports = {
    saveExchangeRate,
    getRecentExchangeRates,
    getExchangeRatesByDate,
};
