const supabase = require('../config/supabase');

// günlük veriyi kaydet
const saveExchangeRate = async (date, rate) => {
    const { data, error } = await supabase
        .from('daily_exchange_rates')
        .upsert(
            { date, rate },
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
const getExchangeRatesByDateRange = async (days = 1, endDate = null) => {
    try {
        // Eğer sadece bir sayı gönderilmişse (gün sayısı olarak)
        if (typeof days === 'number' && days > 0) {
            const { data, error } = await supabase
                .from('daily_exchange_rates')
                .select('*')
                .order('date', { ascending: false })
                .limit(days);

            if (error) throw error;
            console.log("Retrieved exchange rates:", data);
            return data;
        } 
        // Eğer tarih aralığı gönderilmişse
        else {
            const { data, error } = await supabase
                .from('daily_exchange_rates')
                .select('*')
                .gte('date', days) // burada days aslında startDate
                .lte('date', endDate)
                .order('date', { ascending: true });

            if (error) throw error;
            return data;
        }
    } catch (error) {
        console.error("Error getting exchange rates:", error);
        // Hata durumunda fallback değer döndür
        return [{ rate: 38.59 }]; // En son bilinen TRY/USD kuru ile devam et
    }
};

module.exports = {
    saveExchangeRate,
    getRecentExchangeRates,
    getExchangeRatesByDateRange,
};