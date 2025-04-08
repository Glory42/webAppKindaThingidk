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
        const dailylData = JSON.parse(fs.readFileSync(dailyPath, 'utf-8'));
        const productData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        
        const historicalRate = historicalData.historical.find(item => item.year === parseInt(year));
        if (!historicalRate) {
            return res.status(404).json({ error: "Historical rate not found for the specified year" });
        };

        const dailyRate = dailylData.daily[dailylData.daily.length -1].rate;

        const product = productData.find(item => item.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        };

        let historicalPrice, currentPrice;

        if (product.name === 'Iphone') {
            const historicalModel = product.models.find(model => model.year === parseInt(year));
            const currentModel = product.models.find(model => model.year === new Date().getFullYear());
            if (!historicalModel || !currentModel) {
                return res.status(404).json({ error: "Product data not found for the specified years" });
            };

            const historicalVersion = historicalModel.versions[0];
            const currentVersion = currentModel.versions[0];

            historicalPrice = {
                model: historicalPrice.model,
                priceTRY: historicalVersion.price,
                priceUSD: historicalVersion.price / historicalRate.rate,
            };

            currentPrice = {
                priceTRY: currentVersion.price,
                priceUSD: currentVersion.price / currentRate
            };
        } else {
            const historicalPriceData = product.prices.find(p => p.year === parseInt(year));
            const currentPriceData = product.prices.find(p => p.year == new Date().getFullYear());

            if (!historicalPriceData || !currentPriceData) {
                return res.status(404).json({ error: "Product price not found for the specified years" });
            };
            
            historicalPrice = {
                priceTRY: historicalPriceData.price,
                priceUSD: historicalPriceData.price / historicalRate.rate
            };
            
            currentPrice = {
                priceTRY: currentPriceData.price,
                priceUSD: currentPriceData.price / currentRate
            };
            
            if (product.name.includes("Ekmek")) {
                historicalPrice.gram = historicalPriceData.gram;
                currentPrice.gram = currentPriceData.gram;
            };
        };

        res.json({
            
        })
    } catch (error) {
        console.error('Comparison error:', error);
        res.status(500).json({ error: "Error comparing prices" });
    }
};

module.exports = {
    compareHistoricalPrices
};