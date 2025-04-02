const express = require('express');
const currencyRoutes = require('./routes/currency');
require('./utils/cron');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello backend of a doomed app');
    console.log('its really doomed or im going to jail i guees');
});

app.use('/currency', currencyRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});