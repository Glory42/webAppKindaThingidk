const fs = require('fs');
const path = require('path');


const productsPath = path.join(__dirname, '../data/products.json');
const historicalPath = path.join(__dirname, '../data/historicalExchanges.json');
const dailyPath = path.join(__dirname, '../data/dailyExchanges.json');

const compareHistoricalPrices = async (req, res) => {
    try {
        const { year, productId } = req.query;
        if (!year || !productId) {
            return res.status(400).json({ error: "Year and productId paramaters are required" });
        };

        const historicalData = JSON.parse(fs.readFileSync(historicalPath, 'utf-8'));
        const dailyData = JSON.parse(fs.readFileSync(dailyPath, 'utf-8'));
        const productData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        
        const historicalRate = historicalData.historical.find(item => item.year === parseInt(year));
        if (!historicalRate) {
            return res.status(404).json({ error: "Historical rate not found for the specified year" });
        };

        const dailyRate = dailyData.daily[dailyData.daily.length -1].rate;

        const product = productData.find(item => item.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        };

        let historicalPrice;

        if (product.name === 'Iphone') {
            const historicalModel = product.models.find(model => model.year === parseInt(year));
            if (!historicalModel) {
                return res.status(404).json({ error: "Product data not found for the specified years" });
            };

            const historicalVersion = historicalModel.versions[0];

            historicalPrice = {
                model: historicalVersion.model,
                priceTRY: historicalVersion.price * 1000,
                priceUSD: parseFloat((historicalVersion.price * 1000 / historicalRate.rate).toFixed(2)),
            };

             
        } else {
            const historicalPriceData = product.prices.find(p => p.year === parseInt(year));

            if (!historicalPriceData) {
                return res.status(404).json({ error: "Product price not found for the specified years" });
            };
            
            historicalPrice = {
                priceTRY: historicalPriceData.price,
            };
            
            
            if (product.name.includes("Ekmek")) {
                historicalPrice.gram = historicalPriceData.gram;
            };
        };

        res.json({
            product: product.name,
            category: product.category,
            currentRate: dailyRate,
            yearComparison: {
                historical: {
                    year: parseInt(year),
                    exchangeRate: historicalRate.rate,
                    ...historicalPrice
                },
            },
            
        })
    } catch (error) {
        console.error('Comparison error:', error);
        res.status(500).json({ error: "Error comparing prices" });
    }
};

module.exports = {
    compareHistoricalPrices
};