const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = 'mongodb://127.0.0.1:27017/Tickers'; // Replace with your MongoDB URI
    await mongoose.connect(uri);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process on error
  }
};

module.exports = connectDB;

