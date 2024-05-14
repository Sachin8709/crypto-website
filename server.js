const express = require('express');
const axios = require('axios');
const connectDB = require('./Database'); // Import MongoDB connection function
const WazirxTicker = require('./Tickers'); // Import Mongoose schema
const cors = require('cors')

const app = express();
app.use(cors());
const port = process.env.PORT || 5000; // Set port from environment variable or default to 5000

// Connect to MongoDB
connectDB();

// Fetch Wazirx ticker data
const fetchTop10Tickers = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const top10Tickers = Object.values(response.data).slice(0, 10); // Get top 10 tickers

    // Save top 10 tickers to MongoDB
    await Promise.all(
      top10Tickers.map(async (ticker) => {
        const existingTicker = await WazirxTicker.findOne({ base_unit: ticker.base_unit });
        if (!existingTicker) {
          const newTicker = new WazirxTicker({
            base_unit: ticker.base_unit,
            quote_unit: ticker.quote_unit,
            low: ticker.low,
            high: ticker.high,
            last: ticker.last,
            open: ticker.open,
            volume: ticker.volume,
            sell: ticker.sell,
            buy: ticker.buy,
            name: ticker.name,
          });
          await newTicker.save(); // Save new ticker data
        }
      })
    );

    console.log('Top 10 Wazirx tickers saved to MongoDB successfully!');
  } catch (err) {
    console.error('Error fetching or saving tickers:', err.message);
  }
};

// Run fetch function on server startup or periodically based on your requirements
fetchTop10Tickers(); // Uncomment to fetch on startup

app.get('/api/tickers', async (req, res) => {
    try {
      const tickers = await WazirxTicker.find().limit(10); // Fetch top 10 tickers from the database
      res.json(tickers);
    } catch (err) {
      console.error('Error fetching tickers from MongoDB:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => console.log(`Server listening on port ${port}`));
